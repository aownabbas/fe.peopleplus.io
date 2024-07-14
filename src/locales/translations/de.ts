import { tokens } from '../tokens'

export const de = {
	[tokens.common.languageChanged]: 'Sprache geändert',
	[tokens.common.empty_state.message]: 'Kein Eintrag gefunden',
	[tokens.common.empty_state.subheading]: 'Sie haben anscheinend keinen Eintrag',

	[tokens.common.no_option]: 'Keine Option',

	[tokens.nav.academy]: 'Akademie',

	[tokens.nav.settings]: 'Konto',
	[tokens.nav.organization]: 'Organigramm',
	[tokens.nav.employee]: 'Mitarbeiter',
	[tokens.nav.profile]: 'Mitarbeiter',
	[tokens.nav.asset]: 'Vermögenswert',
	[tokens.nav.analytics]: 'Analytik',
	[tokens.nav.auth]: 'Authentifizierung',
	[tokens.nav.blog]: 'Blog',
	[tokens.nav.browse]: 'Durchsuche',
	[tokens.nav.calendar]: 'Kalender',
	[tokens.nav.chat]: 'Plaudern',
	[tokens.nav.checkout]: 'Auschecken',
	[tokens.nav.concepts]: 'Konzepte',
	[tokens.nav.contact]: 'Kontakt',
	[tokens.nav.course]: 'Kurs',
	[tokens.nav.create]: 'Schaffen',
	[tokens.nav.crypto]: 'Crypto',
	[tokens.nav.customers]: 'Kunden',
	[tokens.nav.dashboard]: 'Dashboard',
	[tokens.nav.details]: 'Einzelheiten',
	[tokens.nav.ecommerce]: 'E-Commerce',
	[tokens.nav.edit]: 'Bearbeiten',
	[tokens.nav.error]: 'Fehler',
	[tokens.nav.feed]: 'Füttern',
	[tokens.nav.fileManager]: 'Dateimanager',
	[tokens.nav.finance]: 'Finanzen',
	[tokens.nav.fleet]: 'Flotte',
	[tokens.nav.forgotPassword]: 'Passwort Vergessen',
	[tokens.nav.invoiceList]: 'Rechnungen',
	[tokens.nav.jobList]: 'Stellenangebote',
	[tokens.nav.kanban]: 'Kanban',
	[tokens.nav.list]: 'Aufführen',
	[tokens.nav.login]: 'Anmeldung',
	[tokens.nav.logistics]: 'Logistik',
	[tokens.nav.mail]: 'E-Mail',
	[tokens.nav.management]: 'Verwaltung',
	[tokens.nav.orderList]: 'Aufträge',
	[tokens.nav.overview]: 'Überblick',
	[tokens.nav.pages]: 'Seiten',
	[tokens.nav.postCreate]: 'Beitrag erstellen',
	[tokens.nav.postDetails]: 'Beitragsdetails',
	[tokens.nav.postList]: 'Beitragsliste',
	[tokens.nav.pricing]: 'Preisgestaltung',
	[tokens.nav.productList]: 'Produkte',
	[tokens.nav.profile]: 'Profil',
	[tokens.nav.register]: 'Registrieren',
	[tokens.nav.resetPassword]: 'Passwort Zurücksetzen',
	[tokens.nav.socialMedia]: 'Sozialen Medien',
	[tokens.nav.verifyCode]: 'Code Überprüfen',

	//Employee Page
	[tokens.employee.listing.header.heading]: 'Mitarbeiterführung',
	[tokens.employee.listing.breadcrumbs.employee]: 'Mitarbeiter',
	[tokens.employee.listing.breadcrumbs.dashboard]: 'Übersichtsseite',

	//Organizational Chart Page
	[tokens.organizational_chart.breadcrumbs.parent]: 'Dashboard',
	[tokens.organizational_chart.breadcrumbs.child]: 'Organigramm',
	[tokens.organizational_chart.heading]: 'Organigramm',
	[tokens.organizational_chart.table.name]: 'Name',
	[tokens.organizational_chart.table.department]: 'Abteilung',
	[tokens.organizational_chart.table.designation]: 'Bezeichnung',
	[tokens.organizational_chart.table.joining_date]: 'Eintrittsdatum',
	[tokens.organizational_chart.search_filed.label]: 'Mitarbeiter auswählen',

	//<******Asset Page*******>

	[tokens.asset.create_page.breadcrumbs.parent]: 'Assets',
	[tokens.asset.create_page.breadcrumbs.child]: 'Asset erstellen',
	[tokens.asset.update_page.breadcrumbs.child]: 'Asset aktualisieren',

	[tokens.asset.detail_page.breadcrumbs.parent]: 'Assets',
	[tokens.asset.detail_page.breadcrumbs.child]: 'Detail',
	[tokens.asset.detail_page.asset_id]: 'Asset-ID',

	[tokens.asset.button.add_text]: 'Asset hinzufügen',
	[tokens.asset.button.submit]: 'Einreichen',
	[tokens.asset.button.cancel]: 'Stornieren',
	[tokens.asset.button.edit]: 'Bearbeiten',

	[tokens.asset.file_error.require]: 'Datei ist erforderlich',
	[tokens.asset.file_error.size]: 'Dateigröße darf 2 MB nicht überschreiten',
	[tokens.asset.file_error.no_of_files]: 'Sie können maximal 5 Dateien hochladen',

	[tokens.common.toast_message.record_added]: 'Datensatz erfolgreich hinzugefügt',
	[tokens.common.toast_message.record_updated]: 'Datensatz erfolgreich aktualisiert',
	[tokens.common.toast_message.server_error]: "'Etwas ist schief gelaufen!'",

	[tokens.asset.header.heading]: 'Asset Management',
	[tokens.asset.breadcrumbs.asset]: 'Assets',
	[tokens.asset.breadcrumbs.dashboard]: 'Dashboard',
	[tokens.asset.feedback.tabs.activity]: 'Aktivität',
	[tokens.asset.feedback.comment.label]: 'Kommentar',
	[tokens.asset.feedback.comment.placeHolder]: 'Geben Sie Ihre Antwort ein',
	[tokens.asset.feedback.tabs.documents]: 'Dokumente',

	[tokens.asset.status.active]: 'Aktiv',
	[tokens.asset.status.deactivate]: 'Deaktivieren',
	[tokens.asset.search_slot.filter.category]: 'Kategorie',
	[tokens.asset.search_slot.filter.name]: 'Name',
	[tokens.asset.search_slot.filter.status]: 'Status',
	[tokens.asset.table_heading.name]: 'Name',
	[tokens.asset.table_heading.serial_no]: 'Seriennummer',
	[tokens.asset.table_heading.last_assigned]: 'Zuletzt zugewiesen',
	[tokens.asset.table_heading.asset_value]: 'Asset-Wert',
	[tokens.asset.table_heading.status]: 'Status',
	[tokens.asset.table_heading.action]: 'Aktionen',
	[tokens.asset.search_slot.filter.placeholder]: 'Geben Sie Asset-Namen oder Mitarbeiter ein',

	[tokens.asset.create_page.heading]: 'Neues Asset hinzufügen',
	[tokens.asset.update_page.heading]: 'Asset aktualisieren',
	[tokens.asset.form.fileUpload.caption]: 'SVG, JPG, PNG oder gif maximal 900x400',
	[tokens.asset.form.asset_name.label]: 'Asset-Name',
	[tokens.asset.form.asset_name.helperText]: 'Asset-Name ist erforderlich',
	[tokens.asset.form.asset_id.label]: 'Asset-ID und Tag',
	[tokens.asset.form.asset_id.helperText]: 'Asset-ID ist erforderlich',
	[tokens.asset.form.status.label]: 'Status',
	[tokens.asset.form.employee.label]: 'Mitarbeiter auswählen',
	[tokens.asset.form.category.label]: 'Kategorie auswählen',
	[tokens.asset.form.category.helperText]: 'Kategorie ist erforderlich',
	[tokens.asset.form.department.label]: 'Abteilung auswählen',
	[tokens.asset.form.department.helperText]: 'Abteilung ist erforderlich',
	[tokens.asset.form.allocation_date.label]: 'Zuweisungsdatum',
	[tokens.asset.form.purchase_date.label]: 'Kaufdatum',
	[tokens.asset.form.purchase_price.label]: 'Kaufpreis',
	[tokens.asset.form.purchase_currency.label]: 'Währung kaufen',
	[tokens.asset.form.location.label]: 'Asset-Standort',
	[tokens.asset.form.serial_no.label]: 'Seriennummer',
	[tokens.asset.form.manufacture.label]: 'Hersteller',
	[tokens.asset.form.model.label]: 'Modell',
	[tokens.asset.form.description.label]: 'Beschreibung',

	[tokens.asset.history_detail.assigned_history]: 'Asset-Verlauf',
	[tokens.asset.history_detail.category]: 'Kategorie',
	[tokens.asset.history_detail.information]: 'Information',
	[tokens.asset.history_detail.location]: 'Ort',
	[tokens.asset.history_detail.purchase_date]: 'Kaufdatum',
	[tokens.asset.history_detail.purchase_price]: 'Kaufpreis',

	// Settings page
	[tokens.settings.tabs.general]: 'General',
	[tokens.settings.tabs.asset]: 'Asset',
	[tokens.settings.tabs.work_location]: 'Work Location',
	[tokens.settings.tabs.skill_set]: 'Skill Set',
	[tokens.settings.tabs.benefit_package]: 'Benefit Package',
	[tokens.settings.tabs.onboarding]: 'Onboarding',
	[tokens.settings.tabs.modules]: 'hora',
	[tokens.settings.tabs.expenses]: 'Expenses',
	[tokens.settings.tabs.localization]: 'Localization',
	[tokens.settings.tabs.roles_Permissions]: 'Roles & Permissions',
	[tokens.settings.tabs.personalization]: 'Personalization',
	[tokens.settings.tabs.notifications]: 'Notifications',
	[tokens.settings.tabs.communication]: 'Communication',
	[tokens.settings.tabs.backup_Recovery]: 'Backup & Recovery',
	[tokens.settings.tabs.advanced]: 'Advanced',

	// ################# authentication #################
	//
	[tokens.authentication.layout.title]:
		'Unsere Interviews sind jetzt ein Hit – PeoplePlus ist der HR-Superheld, den wir nicht kannten! 🦸‍️💥',
	[tokens.authentication.layout.sub_title]: '— Maxie Sparkleton',
	[tokens.authentication.layout.heading]: 'Talent Koordinator bei Funovations Corp.',

	// registration
	[tokens.authentication.register.header.heading]: 'Konto erstellen',
	[tokens.authentication.register.header.sub_heading]:
		'Beginnen Sie Ihre 30-tägige kostenlose Testphase.',
	//
	[tokens.authentication.register.form.first_name.label]: 'Vorname',
	[tokens.authentication.register.form.first_name.place_holder]: 'Geben Sie Ihren Vornamen ein',
	[tokens.authentication.register.form.first_name.required]: 'Vorname ist erforderlich',

	//
	[tokens.authentication.register.form.last_name.label]: 'Nachname',
	[tokens.authentication.register.form.last_name.place_holder]: 'Geben Sie Ihren Nachnamen ein',
	[tokens.authentication.register.form.last_name.required]: 'Nachname ist erforderlich',

	//
	[tokens.authentication.register.form.organization_name.label]: 'Organisationsname',
	[tokens.authentication.register.form.organization_name.place_holder]:
		'Geben Sie den Namen Ihrer Organisation ein',
	[tokens.authentication.register.form.organization_name.required]:
		'Organisationsname ist erforderlich',

	//
	[tokens.authentication.register.form.email.label]: 'E-Mail-Adresse',
	[tokens.authentication.register.form.email.place_holder]: 'Geben Sie Ihre E-Mail ein',
	[tokens.authentication.register.form.email.invalid]: 'Ungültiges E-Mail-Format',
	[tokens.authentication.register.form.email.required]: 'E-Mail ist erforderlich',

	//
	[tokens.authentication.register.form.password.label]: 'Passwort',
	[tokens.authentication.register.form.password.place_holder]: 'Geben Sie Ihr Passwort ein',
	[tokens.authentication.register.form.password.length]:
		'Das Passwort muss mindestens 8 Zeichen lang sein',

	//
	[tokens.authentication.register.form.confirm_password.label]: 'Passwort bestätigen',
	[tokens.authentication.register.form.confirm_password.place_holder]:
		'Bestätigen Sie Ihr Passwort',
	[tokens.authentication.register.form.confirm_password.required]:
		'Passwortbestätigung ist erforderlich',
	[tokens.authentication.register.form.confirm_password.match]:
		'Die Passwörter stimmen nicht überein',
	//
	[tokens.authentication.register.form.register_button.text]: 'Registrieren',

	//
	[tokens.authentication.register.form.have_account.account_text]: 'Haben Sie bereits ein Konto?',
	[tokens.authentication.register.form.have_account.log_in_text]: 'Einloggen',

	// logIn
	[tokens.authentication.login.header.heading]: 'Anmelden',
	[tokens.authentication.login.header.sub_heading]:
		'Willkommen zurück! Bitte geben Sie Ihre Daten ein.',
	//
	[tokens.authentication.login.form.email.label]: 'E-Mail-Adresse',
	[tokens.authentication.login.form.email.place_holder]: 'Geben Sie Ihre E-Mail ein',
	[tokens.authentication.login.form.email.invalid]: 'Ungültiges E-Mail-Format',
	[tokens.authentication.login.form.email.required]: 'E-Mail ist erforderlich',

	//
	[tokens.authentication.login.form.password.label]: 'Passwort',
	[tokens.authentication.login.form.password.place_holder]: 'Geben Sie Ihr Passwort ein',
	[tokens.authentication.login.form.password.length]:
		'Das Passwort muss mindestens 8 Zeichen lang sein',

	//
	[tokens.authentication.login.form.forget_password.text]: 'Passwort vergessen?',
	//
	[tokens.authentication.login.form.login_button.text]: 'Anmelden',
	//
	[tokens.authentication.login.form.dont_have_account.account_text]: 'Noch kein Konto?',
	[tokens.authentication.login.form.dont_have_account.register_text]: 'Registrieren',

	// forget password
	[tokens.authentication.forget_password.header.heading]: 'Passwort vergessen?',
	[tokens.authentication.forget_password.header.sub_heading]:
		'Bitte geben Sie Ihre E-Mail-Adresse ein, um das Passwort wiederherzustellen.',
	//
	[tokens.authentication.forget_password.form.email.label]: 'E-Mail-Adresse',
	[tokens.authentication.forget_password.form.email.place_holder]: 'Geben Sie Ihre E-Mail ein',
	[tokens.authentication.forget_password.form.email.invalid]: 'Ungültiges E-Mail-Format',
	[tokens.authentication.forget_password.form.email.required]: 'E-Mail ist erforderlich',
	//
	[tokens.authentication.forget_password.form.reset_button.text]: 'Passwort zurücksetzen',

	//
	[tokens.authentication.forget_password.form.back_to_login.back_text]: 'Zurück zur Anmeldung',

	// verify code
	[tokens.authentication.verify_code.header.heading]: 'Code überprüfen',
	[tokens.authentication.verify_code.form.title]: 'Code',
	[tokens.authentication.verify_code.form.length]: 'Der Code muss 6 Zeichen lang sein',
	[tokens.authentication.verify_code.form.verify_button.text]: 'Verifizieren',
	[tokens.authentication.verify_code.form.back_to_login.back_text]: 'Zurück zur Anmeldung',

	// reset password
	[tokens.authentication.reset_password.header.heading]: 'Neues Passwort festlegen',
	[tokens.authentication.reset_password.header.sub_heading]:
		'Das Passwort muss mindestens 8 Zeichen lang sein.',
	//
	[tokens.authentication.reset_password.form.password.label]: 'Passwort',
	[tokens.authentication.reset_password.form.password.place_holder]:
		'Geben Sie Ihr neues Passwort ein',
	[tokens.authentication.reset_password.form.password.length]:
		'Das Passwort muss mindestens 8 Zeichen lang sein',

	//
	[tokens.authentication.reset_password.form.confirm_password.label]: 'Passwort bestätigen',
	[tokens.authentication.reset_password.form.confirm_password.place_holder]:
		'Bestätigen Sie Ihr neues Passwort',
	[tokens.authentication.reset_password.form.confirm_password.required]:
		'Passwortbestätigung ist erforderlich',
	[tokens.authentication.reset_password.form.confirm_password.match]:
		'Die Passwörter stimmen nicht überein',
	//
	[tokens.authentication.reset_password.form.reset_password_button.text]: 'Passwort zurücksetzen',

	//
	[tokens.authentication.reset_password.form.back_to_login.back_text]: 'Zurück zur Anmeldung',
}
