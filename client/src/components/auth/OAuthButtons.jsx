import { Button } from '../common/Button';
import { authService } from '../../services/authService';

export function OAuthButtons() {
  return (
    <Button as="anchor" className="w-full" href={authService.getGoogleOAuthUrl()} variant="secondary">
      Continue with Google
    </Button>
  );
}