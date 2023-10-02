import crypto from "crypto";

export const createPasswordResetToken = async (): Promise<any> => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 30 * 60 + 10000;
  return { resetToken, passwordResetToken, passwordResetExpires };
};

export const hashToken = async (token): Promise<any> => {
  crypto.createHash("sha256").update(token).digest("hex")
};
