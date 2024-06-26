"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import AuthSocialButton from "./AuthSocialButton";
import { ClipLoader } from "react-spinners";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();

  const session = useSession();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  if (session?.status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader className="text-6xl animate-spin" />
      </div>
    );
  } else if (session?.status === "authenticated") {
    router.push("/users");
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("You have successfully created an account!");
          signIn("credentials", { ...data, redirect: false }).then(
            (callback) => {
              if (callback?.error) {
                toast.error("Unexpected error!");
              }

              if (callback?.ok && !callback?.error) {
                router.push("/users");
                toast.success("Successfully logged in!");
              }
            }
          );
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid data!");
          }

          if (callback?.ok && !callback?.error) {
            router.push("/users");
            toast.success("Successfully logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Unexpected error!");
        }

        if (callback?.ok && !callback?.error) {
          router.push("/users");
          toast.success("Successfully logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height={100}
          width={100}
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2 className="mt-6 font-bold text-3xl text-center text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
      </div>
      <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
        <div className="bg-white shadow px-4 sm:px-10 py-8 sm:rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
              />
            )}
            <Input
              id="email"
              label="Email address"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <div>
              <Button disabled={isLoading} fullWidth type="submit">
                {isLoading ? (
                  <LuLoader className="animate-spin" />
                ) : variant === "LOGIN" ? (
                  "Sign in"
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-gray-300 border-t w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction("google")}
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6 px-2 text-gray-500 text-sm">
            <div>
              {variant === "LOGIN"
                ? "New to Messanger?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
