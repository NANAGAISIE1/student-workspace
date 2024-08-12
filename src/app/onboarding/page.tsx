import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const OnboardingPage = () => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-6 px-16">
      <div className="flex flex-col space-y-2 items-center justify-center">
        <h2>How are you planning to use Student Worksapce?</h2>
        <p className="text-xl text-muted-foreground !mt-0">
          We&apos;ll streamline your setup experience accordingly
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 justify-center items-center">
        <Card className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer aspect-auto">
          <Link href={"/app"}>
            <CardHeader>
              <CardTitle>Personal Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Use Student Workspace for personal projects, or to keep track of
                your personal tasks
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
        <Card className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer aspect-auto">
          <Link href={"/app"}>
            <CardHeader>
              <CardTitle>Professional Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Use Student Workspace for work, or to collaborate with a team
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
        <Card className="w-full hover:bg-accent hover:text-accent-foreground hover:cursor-pointer aspect-auto">
          <Link href={"/app"}>
            <CardHeader>
              <CardTitle>Academic Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Use Student Workspace for school, or to collaborate with
                classmates
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
      </div>
    </main>
  );
};

export default OnboardingPage;
