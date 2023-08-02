import { UserButton } from '@clerk/clerk-react';

import styles from './sidebar.module.css';

export const Sidebar = () => {
	const phone = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

	return (
		<section className={styles.sidebar}>
			<div className={styles.sticky}>
				<header className={styles.header}>
					<a href="/" rel="home">
						Snack Tracker
					</a>
					<UserButton afterSignOutUrl="/" />
				</header>

				<div className={styles.instructions}>
					<h3 className={styles.heading}>How to add to your log</h3>
					<p>
						Send a text message to:
						<a href={`sms:${phone}`} className={styles.postNumber}>
							{phone}
						</a>
						If you send an image, it will be added to the log.
					</p>
				</div>
			</div>
		</section>
	);
};
