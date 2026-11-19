import db from "@/lib/db";

const profiles = [
  { id: 1, name: "Ananya", age: 21, city: "Delhi", college: "Amity University", bio: "Coffee, coding and late-night conversations.", interests: ["Coding", "Coffee", "Music"], image: "/profiles/ananya.png" },
  { id: 2, name: "Riya", age: 22, city: "Gurugram", college: "Gurugram University", bio: "Exploring new places and trying new things.", interests: ["Travel", "Food", "Photography"], image: "/profiles/riya.png" },
  { id: 3, name: "Mehak", age: 21, city: "Delhi", college: "Delhi University", bio: "Books, music and good conversations.", interests: ["Books", "Music", "Movies"], image: "/profiles/mehak.png" },
  { id: 4, name: "Ishita", age: 22, city: "Noida", college: "Amity University", bio: "Always looking for my next adventure.", interests: ["Travel", "Fitness", "Dance"], image: "/profiles/ananya.png" },
  { id: 5, name: "Simran", age: 21, city: "Gurugram", college: "MDI Gurgaon", bio: "Fitness, food and weekend plans.", interests: ["Fitness", "Food", "Movies"], image: "/profiles/riya.png" },
  { id: 6, name: "Kavya", age: 23, city: "Delhi", college: "IP University", bio: "Creative mind with a love for photography.", interests: ["Photography", "Art", "Travel"], image: "/profiles/mehak.png" },
  { id: 7, name: "Aditi", age: 21, city: "Faridabad", college: "Amity University", bio: "Music is basically my personality.", interests: ["Music", "Concerts", "Coffee"], image: "/profiles/ananya.png" },
  { id: 8, name: "Nisha", age: 22, city: "Gurugram", college: "Ashoka University", bio: "Foodie searching for the best places around.", interests: ["Food", "Travel", "Cooking"], image: "/profiles/riya.png" },
  { id: 9, name: "Tanya", age: 21, city: "Delhi", college: "Delhi University", bio: "Sunsets, playlists and spontaneous plans.", interests: ["Music", "Travel", "Photography"], image: "/profiles/mehak.png" },
  { id: 10, name: "Priya", age: 22, city: "Noida", college: "Amity University", bio: "Learning, laughing and living.", interests: ["Books", "Fitness", "Movies"], image: "/profiles/ananya.png" },
  { id: 11, name: "Sakshi", age: 21, city: "Gurugram", college: "Gurugram University", bio: "Designer at heart and explorer by nature.", interests: ["Design", "Travel", "Art"], image: "/profiles/riya.png" },
  { id: 12, name: "Neha", age: 23, city: "Delhi", college: "IP University", bio: "Gym sessions and good conversations.", interests: ["Fitness", "Music", "Food"], image: "/profiles/mehak.png" },
  { id: 13, name: "Pooja", age: 21, city: "Faridabad", college: "Amity University", bio: "Trying to make every day interesting.", interests: ["Travel", "Movies", "Coffee"], image: "/profiles/ananya.png" },
  { id: 14, name: "Shreya", age: 22, city: "Noida", college: "Delhi University", bio: "Coffee first, everything else later.", interests: ["Coffee", "Books", "Music"], image: "/profiles/riya.png" },
  { id: 15, name: "Muskan", age: 21, city: "Delhi", college: "Amity University", bio: "Dance, music and spontaneous adventures.", interests: ["Dance", "Music", "Travel"], image: "/profiles/mehak.png" },
  { id: 16, name: "Ira", age: 23, city: "Gurugram", college: "Ashoka University", bio: "Always planning the next trip.", interests: ["Travel", "Photography", "Food"], image: "/profiles/ananya.png" },
  { id: 17, name: "Palak", age: 21, city: "Delhi", college: "IP University", bio: "Books and long conversations.", interests: ["Books", "Coffee", "Movies"], image: "/profiles/riya.png" },
  { id: 18, name: "Ritika", age: 22, city: "Noida", college: "Amity University", bio: "Fitness enthusiast and foodie.", interests: ["Fitness", "Food", "Travel"], image: "/profiles/mehak.png" },
  { id: 19, name: "Diya", age: 21, city: "Gurugram", college: "Gurugram University", bio: "Music makes everything better.", interests: ["Music", "Concerts", "Dance"], image: "/profiles/ananya.png" },
  { id: 20, name: "Radhika", age: 22, city: "Delhi", college: "Delhi University", bio: "Photography and weekend adventures.", interests: ["Photography", "Travel", "Art"], image: "/profiles/riya.png" },
  { id: 21, name: "Manya", age: 21, city: "Faridabad", college: "Amity University", bio: "Food, friends and fun.", interests: ["Food", "Movies", "Coffee"], image: "/profiles/mehak.png" },
  { id: 22, name: "Aarushi", age: 23, city: "Noida", college: "IP University", bio: "Exploring life one place at a time.", interests: ["Travel", "Photography", "Music"], image: "/profiles/ananya.png" },
  { id: 23, name: "Khushi", age: 21, city: "Delhi", college: "Delhi University", bio: "Creative soul and movie lover.", interests: ["Movies", "Art", "Music"], image: "/profiles/riya.png" },
  { id: 24, name: "Navya", age: 22, city: "Gurugram", college: "Amity University", bio: "Fitness and healthy living.", interests: ["Fitness", "Cooking", "Travel"], image: "/profiles/mehak.png" },
  { id: 25, name: "Ishika", age: 21, city: "Delhi", college: "IP University", bio: "Coffee, books and peaceful evenings.", interests: ["Coffee", "Books", "Music"], image: "/profiles/ananya.png" },
  { id: 26, name: "Sanya", age: 22, city: "Noida", college: "Amity University", bio: "Always up for a good adventure.", interests: ["Travel", "Food", "Photography"], image: "/profiles/riya.png" },
  { id: 27, name: "Ayesha", age: 23, city: "Gurugram", college: "Gurugram University", bio: "Dancing through life.", interests: ["Dance", "Music", "Fitness"], image: "/profiles/mehak.png" },
  { id: 28, name: "Rhea", age: 21, city: "Delhi", college: "Delhi University", bio: "Good vibes and great conversations.", interests: ["Music", "Coffee", "Travel"], image: "/profiles/ananya.png" },
  { id: 29, name: "Anvi", age: 22, city: "Faridabad", college: "Amity University", bio: "Photography enthusiast and foodie.", interests: ["Photography", "Food", "Travel"], image: "/profiles/riya.png" },
  { id: 30, name: "Myra", age: 21, city: "Noida", college: "IP University", bio: "Movies, music and midnight talks.", interests: ["Movies", "Music", "Coffee"], image: "/profiles/mehak.png" },
  { id: 31, name: "Sara", age: 22, city: "Delhi", college: "Amity University", bio: "Exploring new experiences every day.", interests: ["Travel", "Fitness", "Photography"], image: "/profiles/ananya.png" },
  { id: 32, name: "Avni", age: 21, city: "Gurugram", college: "Gurugram University", bio: "Life is better with good music.", interests: ["Music", "Books", "Travel"], image: "/profiles/riya.png" },
];

const CURRENT_USER_ID = 1000;

export async function GET() {
  try {
    const mutualLikes = db
      .prepare(
        `
        SELECT
          s1.profile_id AS profile_id,
          s1.created_at AS matched_at
        FROM swipes s1
        INNER JOIN swipes s2
          ON s1.user_id = s2.profile_id
          AND s1.profile_id = s2.user_id
        WHERE s1.user_id = ?
          AND s1.action = 'like'
          AND s2.action = 'like'
        ORDER BY s1.created_at DESC
        `
      )
      .all(CURRENT_USER_ID);

    const matchedProfiles = mutualLikes
      .map((match) => {
        const profile = profiles.find(
          (item) => item.id === match.profile_id
        );

        if (!profile) return null;

        return {
          ...profile,
          matchedAt: match.matched_at,
        };
      })
      .filter(Boolean);

    return Response.json(matchedProfiles);
  } catch (error) {
    console.error("Matches API error:", error.message);

    return Response.json(
      { error: "Something went wrong while loading matches" },
      { status: 500 }
    );
  }
}