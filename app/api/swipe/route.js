import db from "@/lib/db";

const CURRENT_USER_ID = 1000;

export async function POST(request) {
  try {
    const body = await request.json();

    const { profileId, action } = body;

    if (!profileId || !action) {
      return Response.json(
        { error: "profileId and action are required" },
        { status: 400 }
      );
    }

    if (action !== "like" && action !== "pass") {
      return Response.json(
        { error: "Action must be like or pass" },
        { status: 400 }
      );
    }

    // Check if the current user already swiped on this profile
    const existingSwipe = db
      .prepare(
        `
        SELECT *
        FROM swipes
        WHERE user_id = ? AND profile_id = ?
        `
      )
      .get(CURRENT_USER_ID, profileId);

    if (existingSwipe) {
      return Response.json(
        { error: "Profile has already been swiped" },
        { status: 409 }
      );
    }

    // Save the current user's swipe
    const result = db
      .prepare(
        `
        INSERT INTO swipes (
          user_id,
          profile_id,
          action,
          created_at
        )
        VALUES (?, ?, ?, ?)
        `
      )
      .run(
        CURRENT_USER_ID,
        profileId,
        action,
        new Date().toISOString()
      );

    let matched = false;

    // Check for a mutual like
    if (action === "like") {
      const mutualLike = db
        .prepare(
          `
          SELECT *
          FROM swipes
          WHERE user_id = ?
            AND profile_id = ?
            AND action = 'like'
          `
        )
        .get(profileId, CURRENT_USER_ID);

      if (mutualLike) {
        db.prepare(
          `
          INSERT OR IGNORE INTO matches (
            profile_id,
            matched_at
          )
          VALUES (?, ?)
          `
        ).run(
          profileId,
          new Date().toISOString()
        );

        matched = true;
      }
    }

    return Response.json(
      {
        message: matched
          ? "It's a match!"
          : "Swipe saved successfully",

        matched,

        swipe: {
          id: result.lastInsertRowid,
          profileId,
          action,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Swipe API error:", error);

    return Response.json(
      { error: "Something went wrong while saving the swipe" },
      { status: 500 }
    );
  }
}