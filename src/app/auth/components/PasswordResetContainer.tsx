'use client';

import { FormEvent, useCallback } from 'react';

import useResetPassword from '~/core/hooks/use-reset-password';
import AuthErrorMessage from '~/app/auth/components/AuthErrorMessage';

import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

import configuration from '~/configuration';

function PasswordResetContainer() {
  const resetPasswordMutation = useResetPassword();
  const error = resetPasswordMutation.error;
  const success = resetPasswordMutation.data;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get('email') as string;
      const redirectTo = getReturnUrl();

      await resetPasswordMutation.trigger({
        email,
        redirectTo,
      });
    },
    [resetPasswordMutation]
  );

  return (
    <>
      <If condition={success}>
        <Alert type={'success'}>
          Check your Inbox! We emailed you a link for resetting your Password
        </Alert>
      </If>

      <If condition={!resetPasswordMutation.data}>
        <>
          <form
            onSubmit={(e) => void onSubmit(e)}
            className={'container mx-auto flex justify-center'}
          >
            <div className={'flex-col space-y-4'}>
              <div>
                <p className={'text-sm text-gray-700 dark:text-gray-400'}>
                  Enter your email address below. You will receive a link to
                  reset your password.
                </p>
              </div>

              <div>
                <TextField.Label>
                  Email
                  <TextField.Input
                    name="email"
                    required
                    type="email"
                    placeholder={'your@email.com'}
                  />
                </TextField.Label>
              </div>

              <AuthErrorMessage error={error} />

              <Button
                loading={resetPasswordMutation.isMutating}
                type="submit"
                block
              >
                Reset Password
              </Button>
            </div>
          </form>
        </>
      </If>
    </>
  );
}

export default PasswordResetContainer;

/**
 * @description
 * Return the URL where the user will be redirected to after resetting
 * their password
 */
function getReturnUrl() {
  const host = window.location.origin;
  const callback = configuration.paths.authCallback;
  const redirectPath = configuration.paths.settings.password;

  return `${host}${callback}?redirectPath=${redirectPath}`;
}
