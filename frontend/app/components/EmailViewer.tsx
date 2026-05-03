"use client";
import { useState } from "react";
import { deleteEmailContent, fetchEmailContent } from "@/app/actions/email";
import { dateFormatter } from "../lib/helper";
import { useParams } from "next/navigation";

interface EmailViewerProps {
  emails: any[];
}

export default function EmailViewer({ emails }: EmailViewerProps) {
  const { projectId } = useParams() as { projectId: string };
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailClick = async (email: any) => {
    setLoading(true);
    try {
      const content = await fetchEmailContent(email._id);
      setSelectedEmail(content);
    } catch (error) {
      console.error("Error fetching email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-wrapper wrapper">
      <div className="row align-items-stretch">
        <div className="mail-list-container col-md-3 pt-4 pb-4 border-right">
          <div className="border-bottom mb-3 px-3">
            <div className="form-group">
              <input
                className="form-control w-100"
                type="search"
                placeholder="Search mail"
                id="Mail-rearch"
              />
            </div>
          </div>
          {emails?.length > 0 ? (
            <>
              {emails.map((email: any) => (
                <div
                  className={`mail-list ${selectedEmail?._id === email._id ? "active" : ""}`}
                  key={email._id}
                  onClick={() => handleEmailClick(email)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="content">
                    <p className="sender-name">{email.from}</p>
                    <p className="message_text">{email.subject}</p>
                    <p className="message_text">
                      {dateFormatter(email.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center">No emails found.</p>
          )}
        </div>

        <div className="mail-view d-none d-md-block col-md-9">
          {loading ? (
            <p>Loading...</p>
          ) : selectedEmail ? (
            <>
              <div className="message-body">
                <div className="sender-details d-flex justify-content-between align-items-center">
                  <div className="details">
                    <p className="msg-subject">{selectedEmail.subject}</p>
                    <p className="sender-email">
                      {selectedEmail.from}
                      &nbsp;<i className="ti-user"></i>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-dark my-4"
                    onClick={() =>
                      deleteEmailContent(selectedEmail._id, projectId)
                    }
                  >
                    <i className="ti-trash text-primary me-1"></i>Delete
                  </button>
                </div>
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                ></div>
                <div className="attachments-sections">
                  <ul>
                    <li>
                      <div className="thumb">
                        <i className="ti-file"></i>
                      </div>
                      <div className="details">
                        <p className="file-name">Seminar Reports.pdf</p>
                        <div className="buttons">
                          <p className="file-size">678Kb</p>
                          <a href="#" className="view">
                            View
                          </a>
                          <a href="#" className="download">
                            Download
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="thumb">
                        <i className="ti-image"></i>
                      </div>
                      <div className="details">
                        <p className="file-name">Product Design.jpg</p>
                        <div className="buttons">
                          <p className="file-size">1.96Mb</p>
                          <a href="#" className="view">
                            View
                          </a>
                          <a href="#" className="download">
                            Download
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p className="mt-5 text-center text-muted">Select an email to view</p>
          )}
        </div>
      </div>
    </div>
  );
}
