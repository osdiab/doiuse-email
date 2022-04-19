import type { EmailClient, EmailClientFamily } from '~/types/email-client.js';
import type { DoIUseEmailOptions } from '~/types/options.js';

export const emailClientFamiliesList = [
	'apple-mail',
	'gmail',
	'orange',
	'outlook',
	'yahoo',
	'aol',
	'samsung-email',
	'sfr',
	'thunderbird',
	'protonmail',
	'hey',
	'mail-ru',
	'fastmail',
	'laposte',
] as const;

export const emailClientsList = [
	'apple-mail.macos',
	'apple-mail.ios',
	'gmail.desktop-webmail',
	'gmail.ios',
	'gmail.android',
	'gmail.mobile-webmail',
	'orange.desktop-webmail',
	'orange.ios',
	'orange.android',
	'outlook.windows',
	'outlook.windows-mail',
	'outlook.macos',
	'outlook.ios',
	'outlook.android',
	'yahoo.desktop-webmail',
	'yahoo.ios',
	'yahoo.android',
	'aol.desktop-webmail',
	'aol.ios',
	'aol.android',
	'samsung-email.android',
	'sfr.desktop-webmail',
	'sfr.ios',
	'sfr.android',
	'thunderbird.macos',
	'protonmail.desktop-webmail',
	'protonmail.ios',
	'protonmail.android',
	'hey.desktop-webmail',
	'mail-ru.desktop-webmail',
	'fastmail.desktop-webmail',
	'laposte.desktop-webmail',
] as const;

const emailClientFamilyToClients = {} as Record<
	EmailClientFamily,
	EmailClient[]
>;

for (const emailClient of emailClientsList) {
	const family = emailClient.split('.')[0]! as EmailClientFamily;

	emailClientFamilyToClients[family] ??= [];
	emailClientFamilyToClients[family].push(emailClient);
}

export function getEmailClientsFromOptions(
	options: DoIUseEmailOptions
): EmailClient[] {
	const { emailClients: emailClientsOrFamilies } = options;

	const emailClients = new Set<EmailClient>();

	for (const emailClientOrFamily of emailClientsOrFamilies) {
		if (emailClientOrFamily.includes('.')) {
			const family = emailClientOrFamily.split('.')[0]! as EmailClientFamily;

			for (const emailClient of emailClientFamilyToClients[family]) {
				emailClients.add(emailClient);
			}
		}
	}

	return [...emailClients];
}
