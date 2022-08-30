import { CoursePart } from "../../types";

const Part = (part: CoursePart) => {
    let info;

    switch(part.type) {
      case 'normal':
        info = <div><p><i>{part.description}</i></p></div>;
        break;
      case 'groupProject':
        info = <div><p>Project exercises: {part.groupProjectCount}</p></div>;
        break;
      case 'submission':
        info = <div>
                 <p><i>{part.description}</i></p>
                 <p>Submit to: {part.exerciseSubmissionLink}</p>
               </div>;
        break;
      case 'special':
        const requirements = part.requirements.map((item, index) => {
          return index === part.requirements.length - 1 
            ? `${item}` 
            : `${item}, `;
        });

        info = <div>
                 <p><i>{part.description}</i></p>
                 <p>Requirements: {requirements}</p>
               </div>;
        break;
      default:
        info = null;
    };

    return (
      <div>
        <p><b>{part.name} {part.exerciseCount}</b></p>
        {info}
      </div>
    );
};

export default Part;