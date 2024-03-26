import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PushToQuestionsFailed = async ({ studentExamId, failedQuestions }) => {
    console.log(studentExamId, failedQuestions)
    const PushToQuestionsFailedApiUrl = `https://localhost:7252/api/StudentExam/push-to-questions-failed/${studentExamId}`;
        const response = await fetch(PushToQuestionsFailedApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(failedQuestions),
        });
  
        if (!response.ok) {
          toast.error("failed to create entity")
          throw new Error('Failed to create entity');
        }
        toast.success("entity created successfully")
        return await response.json();
  };

export default PushToQuestionsFailed;
