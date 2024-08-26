import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function CodeInput({ length = 6 }: { length?: number }) {
  return (
    <div className="mb-4">
      <InputOTP maxLength={6} name="code" id="code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {/* <InputOTP maxLength={8} name="code" id="code">
          <InputOTPGroup>
            {Array(length)
              .fill(null)
              .map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
          </InputOTPGroup>
        </InputOTP> */}
    </div>
  );
}
