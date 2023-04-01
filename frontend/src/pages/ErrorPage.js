import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError();
    
    let title = 'Something went wrong!'
    let errorContent = 'Try another url.' 

    if(error.status === 500) {
        
        errorContent = error.data.message;
    }

    if(error.status === 404) {
        
        errorContent = 'Page is not found';
    }
    
    if(error.status === 112){
        errorContent = error.data.message;
    }



  return (
    <>
        
        <MainNavigation />
      <PageContent title={title}>
        <p>{errorContent}</p>
      </PageContent>
    </>
  );
}
