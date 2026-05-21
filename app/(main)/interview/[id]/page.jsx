import { getAssessment } from "@/actions/interview";
import { notFound } from "next/navigation";
import QuizDetail from "./_components/quiz-detail";

export default async function QuizDetailPage({ params }) {
  const { id } = await params;

  let assessment;
  try {
    assessment = await getAssessment(id);
  } catch {
    notFound();
  }

  if (!assessment) notFound();

  return <QuizDetail assessment={assessment} />;
}
