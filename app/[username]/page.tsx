export default function UserProfile({ params }) {
  const { username } = params;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {username}</p>
    </div>
  );
}
