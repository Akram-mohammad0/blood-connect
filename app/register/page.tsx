"use client";
import BackButton from "../../components/BackButton";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <BackButton />
      <RegisterForm />
    </div>
  );
}
