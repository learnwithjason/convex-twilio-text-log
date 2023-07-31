import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { Messages } from './messages';
import { Sidebar } from './sidebar';

import styles from './app.module.css';

export const App = () => {
	return (
		<>
			<Authenticated>
				<main className={styles.container}>
					<Sidebar />
					<Messages />

					<footer className={styles.footer}>
						<a href="https://lwj.dev">a Learn With Jason project</a>
						<a href="https://lwj.dev/convex-actions">learn to build this</a>
						<a href="https://github.com/learnwithjason/convex-twilio-text-log">
							source code
						</a>
						<a href="https://lwj.dev/convex">try Convex</a>
					</footer>
				</main>
			</Authenticated>
			<Unauthenticated>
				<main className={styles.signup}>
					<h1>This demo requires a free account</h1>
					<p>
						This app works by storing texts and images you send from your phone
						in a log-style feed. Sign up with your phone number to try it out.
						Your data will not be shared and you can delete you account at any
						time.
					</p>
					<div className={styles.buttons}>
						<SignUpButton />
						<SignInButton />
					</div>
					<div className={styles.tutorial}>
						<h2>Don't want to sign up?</h2>
						<p>
							If you prefer, you can watch a demo of this app and see it get
							built by{' '}
							<a href="https://lwj.dev/convex-actions">watching the tutorial</a>
							.
						</p>
					</div>
				</main>
			</Unauthenticated>
		</>
	);
};
