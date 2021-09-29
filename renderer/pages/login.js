import { Button, FormControl } from "react-bootstrap";
export default function LoginPage() {
  return (
    <div>
      <FormControl type="text" placeholder="Username" />
      <FormControl type="password" placeholder="Password" />
      <Button variant="primary">Login</Button>
    </div>
  );
}
