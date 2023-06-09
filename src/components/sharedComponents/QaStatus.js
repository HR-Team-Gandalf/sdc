import React from "react";
import Status from "./Status";
import AuthorInfo from "./AuthorInfo";
import Report from "./Report";
import Helpful from "./Helpful";

const QaStatus = ({ handleReportClick, handleHelpfulClick, data, messageType }) => {
  const sharedClasses = "flex-initial";

  return (
    <Status
      className="qaStatus"
      sharedClasses={sharedClasses}
      children={[
        <AuthorInfo key={1} sharedClasses={sharedClasses} data={data} />,
        <Helpful
          key={2}
          yesCount={data.helpfulCount}
          handleHelpfulClick={handleHelpfulClick}
          messageType={messageType}
          className={sharedClasses + " status"}
        />,
        <Report
          key={3}
          handleReportClick={handleReportClick}
          className={sharedClasses + " status"}
        />,
      ]}
    />
  );
};

export default QaStatus;
