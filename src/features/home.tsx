import { clients, pets } from "../data/mockdata";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Veterinary Clinic</h1>
      <p>Client: {clients[0].name}</p>
      <p>Total pets: {pets.length}</p>
    </div>
  );
}
