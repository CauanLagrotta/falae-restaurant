import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

export function ForgotPassword() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[80%] max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Esqueceu a Senha?</h2>
        <p className="text-center text-gray-600 mb-6">
          Insira seu e-mail para receber o link de redefinição de senha.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            toast.success("E-mail de redefinição enviado com sucesso!");
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Digite seu email..."
                  className={`w-full px-4 py-2 mt-2 border rounded-md ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Enviar E-mail
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </div>
  );
}
