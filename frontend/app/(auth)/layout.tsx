export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div className="row flex-grow">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            {children}
          </div>
          <div className="col-lg-6 login-half-bg d-flex flex-row">
            <p className="text-white fw-medium text-center flex-grow align-self-end">
              Copyright &copy; 2021 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
