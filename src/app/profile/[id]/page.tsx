import ProfileCardComponent from "./ProfileCard";

export const metadata = {
  title: "Profile - SnippetShare",
  description: "Xem thông tin cá nhân trên SnippetShare.",
}

export default function ProfilePage() {
  return (
    <div className="">
      <ProfileCardComponent />
    </div>
  );
}
