import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

import styles from './messages.module.css';

export const Messages = () => {
	const { user } = useUser();

	// the user MUST provide a phone number to sign up, so know this is set
	const sender = user!.primaryPhoneNumber!.phoneNumber;

	// load all messages from the currently logged in user
	const messages = useQuery(api.messages.get, { sender });

	return (
		<section className={styles.wrapper}>
			<ul className={styles.messages}>
				{messages?.map(({ _id, _creationTime, text, image }) => {
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
		</section>
	);
};
