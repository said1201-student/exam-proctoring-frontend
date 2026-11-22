import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../shared/components/Button";
import { Input } from "../shared/components/Input";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Barua pepe inahitajika";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Barua pepe si sahihi";
    }
    if (!form.password) {
      next.password = "Nenosiri linahitajika";
    } else if (form.password.length < 6) {
      next.password = "Nenosiri lazima liwe na herufi 6 au zaidi";
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      navigate("/dashboard");
    } catch (err) {
      setErrors({ form: "Imeshindikana kuingia. Jaribu tena." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-ink-900 p-12 text-white">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <div className="h-9 w-9 rounded-md bg-brand-500 grid place-items-center">E</div>
          ExamPro
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Mtihani wa kweli.
            <br />
            Uangalizi wa kweli.
          </h1>
          <p className="mt-4 text-ink-300 max-w-md">
            Jukwaa la mtihani la mtandaoni lenye uangalizi wa AI, linalotumika na taasisi za elimu Tanzania.
          </p>
        </div>

        <p className="text-sm text-ink-500">© 2025 ExamPro</p>
      </div>

      <div className="flex items-center justify-center p-6 bg-ink-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-ink-900">Karibu tena</h2>
          <p className="text-sm text-ink-500 mt-1">Ingia kwenye akaunti yako</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Input
              label="Barua pepe"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jina@shule.ac.tz"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-ink-700">
                  Nenosiri
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-sm text-brand-600 hover:text-brand-700"
                >
                  {showPassword ? "Ficha" : "Onyesha"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-11 px-3 rounded-md border bg-white text-ink-900 outline-none transition-colors ${
                  errors.password
                    ? "border-danger focus:border-danger focus:ring-2 focus:ring-red-100"
                    : "border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                }`}
              />
              {errors.password && <p className="mt-1 text-sm text-danger">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" className="rounded border-ink-300" />
                Nikumbuke
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700">
                Umesahau nenosiri?
              </Link>
            </div>

            {errors.form && (
              <p className="text-sm text-danger bg-red-50 px-3 py-2 rounded-md">{errors.form}</p>
            )}

            <Button type="submit" loading={submitting} className="w-full" size="lg">
              Ingia
            </Button>

            <p className="text-center text-sm text-ink-500">
              Huna akaunti?{" "}
              <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
                Jisajili
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}