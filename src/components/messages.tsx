import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

import styles from './messages.module.css';

const Empty = () => {
	return (
		<div className={styles.empty}>
			<h1>Ready to start logging?</h1>
			<p>
				Text a photo and any details or description you want to include about it
				to:
				<a href="sms:+18145267822">+1 814-526-7822</a>
				Send your first text to see it logged here!
			</p>
		</div>
	);
};

export const Messages = () => {
	const { user } = useUser();

	// the user MUST provide a phone number to sign up, so know this is set
	const sender = user!.primaryPhoneNumber!.phoneNumber;

	// load all messages from the currently logged in user
	const messages = useQuery(api.messages.get, { sender }) || [];

	return (
		<section className={styles.wrapper}>
			{messages.length > 0 ? (
				<ul className={styles.messages}>
					{messages.map(({ _id, _creationTime, text, image }) => {
						return (
							<li key={_id} className={styles.message}>
								{image && image.url ? (
									<img className={styles.image} src={image.url} alt={text} />
								) : null}
								<p className={styles.text}>{text}</p>
								<p className={styles.meta}>
									Posted {new Date(_creationTime).toLocaleString()}
								</p>
							</li>
						);
					})}
				</ul>
			) : (
				<Empty />
			)}
		</section>
	);
};
