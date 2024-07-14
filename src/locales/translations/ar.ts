import { tokens } from '../tokens'

export const ar = {
	// ... Other keys have been omitted for brevity
	[tokens.common.languageChanged]: 'تم تغيير اللغة',
	[tokens.common.edit]: 'تعديل',
	[tokens.common.submit]: 'إرسال',
	[tokens.common.delete]: 'حذف',
	[tokens.common.search]: 'بحث',
	[tokens.common.save_changes]: 'حفظ التغييرات',
	[tokens.common.no_option]: 'لا خيار',

	// nav
	[tokens.nav.academy]: 'الأكاديمية',
	[tokens.nav.settings]: 'الإعدادات',
	[tokens.nav.employee]: 'موظف',
	[tokens.nav.asset]: 'أصل',
	[tokens.nav.organization]: 'الهيكل التنظيمي	',
	[tokens.nav.analytics]: 'التحليلات',
	[tokens.nav.auth]: 'المصادقة',
	[tokens.nav.blog]: 'المدونة',
	[tokens.nav.browse]: 'تصفح',
	[tokens.nav.calendar]: 'التقويم',
	[tokens.nav.chat]: 'الدردشة',
	[tokens.nav.checkout]: 'الدفع',
	[tokens.nav.concepts]: 'المفاهيم',
	[tokens.nav.contact]: 'الاتصال',
	[tokens.nav.course]: 'الدورة التدريبية',
	[tokens.nav.create]: 'إنشاء',
	[tokens.nav.crypto]: 'العملات الرقمية',
	[tokens.nav.customers]: 'العملاء',
	[tokens.nav.dashboard]: 'لوحة التحكم',
	[tokens.nav.details]: 'التفاصيل',
	[tokens.nav.ecommerce]: 'التجارة الإلكترونية',
	[tokens.nav.edit]: 'تحرير',
	[tokens.nav.error]: 'خطأ',
	[tokens.nav.feed]: 'التغذية',
	[tokens.nav.fileManager]: 'مدير الملفات',
	[tokens.nav.finance]: 'المالية',
	[tokens.nav.fleet]: 'الأسطول',
	[tokens.nav.forgotPassword]: 'نسيت كلمة المرور',
	[tokens.nav.invoiceList]: 'الفواتير',
	[tokens.nav.jobList]: 'قائمة الوظائف',
	[tokens.nav.kanban]: 'كانبان',
	[tokens.nav.list]: 'القائمة',
	[tokens.nav.login]: 'تسجيل الدخول',
	[tokens.nav.logistics]: 'اللوجستيات',
	[tokens.nav.mail]: 'البريد',
	[tokens.nav.management]: 'الإدارة',
	[tokens.nav.orderList]: 'الطلبات',
	[tokens.nav.overview]: 'نظرة عامة',
	[tokens.nav.pages]: 'الصفحات',
	[tokens.nav.postCreate]: 'إنشاء منشور',
	[tokens.nav.postDetails]: 'تفاصيل المنشور',
	[tokens.nav.postList]: 'قائمة المنشورات',
	[tokens.nav.pricing]: 'التسعير',
	[tokens.nav.productList]: 'المنتجات',
	[tokens.nav.profile]: 'الملف الشخصي',
	[tokens.nav.register]: 'تسجيل',
	[tokens.nav.resetPassword]: 'إعادة تعيين كلمة المرور',
	[tokens.nav.socialMedia]: 'وسائل التواصل الاجتماعي',
	[tokens.nav.verifyCode]: 'تحقق من الرمز',

	//Employee Page
	[tokens.employee.listing.header.heading]: 'إدارة الموظفين',
	[tokens.employee.listing.breadcrumbs.employee]: 'موظفون',
	[tokens.employee.listing.breadcrumbs.dashboard]: 'لوحة القيادة',

	//<******Asset Page*******>

	[tokens.asset.create_page.breadcrumbs.parent]: 'الأصول',
	[tokens.asset.create_page.breadcrumbs.child]: 'إنشاء أصل',
	[tokens.asset.update_page.breadcrumbs.child]: 'تحديث الأصل',

	[tokens.asset.detail_page.breadcrumbs.parent]: 'الأصول',
	[tokens.asset.detail_page.breadcrumbs.child]: 'التفاصيل',
	[tokens.asset.detail_page.asset_id]: 'معرّف الأصل',

	[tokens.asset.button.add_text]: 'إضافة أصل',
	[tokens.asset.button.submit]: 'إرسال',
	[tokens.asset.button.cancel]: 'إلغاء',
	[tokens.asset.button.edit]: 'تحرير',

	[tokens.asset.file_error.require]: 'الملف مطلوب',
	[tokens.asset.file_error.size]: 'حجم الملف يجب ألا يتجاوز 2 ميغابايت',
	[tokens.asset.file_error.no_of_files]: 'يمكنك تحميل ما يصل إلى 5 ملفات فقط',

	[tokens.common.toast_message.record_added]: 'تمت إضافة السجل بنجاح',
	[tokens.common.toast_message.record_updated]: 'تم تحديث السجل بنجاح',
	[tokens.common.toast_message.server_error]: "'حدث خطأ ما!'",

	[tokens.asset.header.heading]: 'إدارة الأصول',
	[tokens.asset.breadcrumbs.asset]: 'الأصول',
	[tokens.asset.breadcrumbs.dashboard]: 'لوحة القيادة',
	[tokens.asset.feedback.tabs.activity]: 'النشاط',
	[tokens.asset.feedback.comment.label]: 'تعليق',
	[tokens.asset.feedback.comment.placeHolder]: 'اكتب ردك',
	[tokens.asset.feedback.tabs.documents]: 'المستندات',

	[tokens.asset.status.active]: 'نشط',
	[tokens.asset.status.deactivate]: 'تعطيل',
	[tokens.asset.search_slot.filter.category]: 'الفئة',
	[tokens.asset.search_slot.filter.name]: 'الاسم',
	[tokens.asset.search_slot.filter.status]: 'الحالة',
	[tokens.asset.table_heading.name]: 'الاسم',
	[tokens.asset.table_heading.serial_no]: 'الرقم التسلسلي',
	[tokens.asset.table_heading.last_assigned]: 'آخر تعيين',
	[tokens.asset.table_heading.asset_value]: 'قيمة',

	//Organizational Chart Page
	[tokens.organizational_chart.breadcrumbs.parent]: 'لوحة القيادة',
	[tokens.organizational_chart.breadcrumbs.child]: 'الهيكل التنظيمي',
	[tokens.organizational_chart.heading]: 'الهيكل التنظيمي',
	[tokens.organizational_chart.table.name]: 'الاسم',
	[tokens.organizational_chart.table.department]: 'القسم',
	[tokens.organizational_chart.table.designation]: 'الوظيفة',
	[tokens.organizational_chart.table.joining_date]: 'تاريخ الانضمام',
	[tokens.organizational_chart.search_filed.label]: 'اختيار الموظف',

	// Settings page
	[tokens.settings.tabs.general]: 'عام',
	[tokens.settings.tabs.asset]: 'الأصول',
	[tokens.settings.tabs.work_location]: 'مكان العمل',
	[tokens.settings.tabs.skill_set]: 'مجموعة المهارات',
	[tokens.settings.tabs.benefit_package]: 'حزمة الفوائد',
	[tokens.settings.tabs.onboarding]: 'التوجيه',
	[tokens.settings.tabs.modules]: 'الوحدات',
	[tokens.settings.tabs.expenses]: 'المصاريف',
	[tokens.settings.tabs.localization]: 'الموقع',
	[tokens.settings.tabs.roles_Permissions]: 'الأدوار والأذونات',
	[tokens.settings.tabs.personalization]: 'التخصيص',
	[tokens.settings.tabs.notifications]: 'الإشعارات',
	[tokens.settings.tabs.communication]: 'التواصل',
	[tokens.settings.tabs.backup_Recovery]: 'النسخ الاحتياطي والاسترداد',
	[tokens.settings.tabs.advanced]: 'متقدم',

	// settings page ( general form)
	[tokens.settings.general.headers.company_info]: 'معلومات الشركة',
	[tokens.settings.general.headers.office_info]: 'معلومات المكتب',
	[tokens.settings.general.headers.departments]: 'الأقسام',
	[tokens.settings.general.add_text]: 'إضافة قسم آخر',
	//
	[tokens.settings.general.form.avatar.name]: 'الشعار',
	[tokens.settings.general.form.avatar.helperText]: '',
	// [tokens.settings.general.form.avatar.placeHolder]: '',
	[tokens.settings.general.form.avatar.name]: 'الشعار',
	//
	[tokens.settings.general.form.company_name.name]: 'اسم الشركة',
	[tokens.settings.general.form.company_name.helperText]: '',
	[tokens.settings.general.form.company_name.placeHolder]: 'حساب اختبار ضمان الجودة',
	//
	[tokens.settings.general.form.website.name]: 'الموقع الإلكتروني',
	[tokens.settings.general.form.website.helperText]: '',
	[tokens.settings.general.form.website.placeHolder]: 'www.domain.com',
	//
	[tokens.settings.general.form.email.name]: 'البريد الإلكتروني',
	[tokens.settings.general.form.email.helperText]:
		'اتصل ب support@peopleplus.io لتغيير البريد الإلكتروني',
	[tokens.settings.general.form.email.placeHolder]: '',
	//
	[tokens.settings.general.form.phone_number.name]: 'رقم الهاتف',
	[tokens.settings.general.form.phone_number.helperText]: ' ',
	[tokens.settings.general.form.phone_number.placeHolder]: 'أدخل رقم الهاتف',
	//
	[tokens.settings.general.form.company_description.name]: 'وصف الشركة',
	[tokens.settings.general.form.company_description.helperText]: 'أدخل وصفاً مختصراً عن الشركة',
	[tokens.settings.general.form.company_description.placeHolder]: '',
	//
	[tokens.settings.general.form.office_add.name]: 'عنوان المكتب',
	[tokens.settings.general.form.office_add.helperText]: ' ',
	[tokens.settings.general.form.office_add.placeHolder]: 'أدخل العنوان',
	//
	[tokens.settings.general.form.city.name]: 'المدينة',
	[tokens.settings.general.form.city.helperText]: ' ',
	[tokens.settings.general.form.city.placeHolder]: 'أدخل المدينة',
	//
	[tokens.settings.general.form.zip_code.name]: 'الرمز البريدي',
	[tokens.settings.general.form.zip_code.helperText]: ' ',
	[tokens.settings.general.form.zip_code.placeHolder]: 'أدخل الرمز',
	//
	[tokens.settings.general.form.country.name]: 'البلد',
	[tokens.settings.general.form.country.helperText]: ' ',
	[tokens.settings.general.form.country.placeHolder]: 'اختر البلد',
	//
	[tokens.settings.general.form.time_zone.name]: 'التوقيت الزمني',
	[tokens.settings.general.form.time_zone.helperText]: ' ',
	[tokens.settings.general.form.time_zone.placeHolder]: 'اختر المنطقة الزمنية',
	//
	[tokens.settings.general.form.depart_field.name]: 'الاسم',
	[tokens.settings.general.form.depart_field.helperText]: ' ',
	[tokens.settings.general.form.depart_field.placeHolder]: 'اسم القسم',
	//
	[tokens.settings.general.form.depart_value.name]: 'التفاصيل',
	[tokens.settings.general.form.depart_value.helperText]: ' ',
	[tokens.settings.general.form.depart_value.placeHolder]: 'تفاصيل القسم',
	// ... Other keys have been omitted for brevity

	[tokens.settings.general.form.company_name.placeHolder]: 'حساب اختبار ضمان الجودة',
	[tokens.settings.general.form.website.placeHolder]: 'www.domain.com',
	[tokens.settings.general.form.phone_number.placeHolder]: 'أدخل رقم الهاتف',
	[tokens.settings.general.form.office_add.placeHolder]: 'أدخل العنوان',
	[tokens.settings.general.form.city.placeHolder]: 'أدخل المدينة',
	[tokens.settings.general.form.zip_code.placeHolder]: 'أدخل الرمز',
	[tokens.settings.general.form.country.placeHolder]: 'اختر البلد',
	[tokens.settings.general.form.time_zone.placeHolder]: 'اختر المنطقة الزمنية',
	[tokens.settings.general.form.depart_field.placeHolder]: 'اسم القسم',
	[tokens.settings.general.form.depart_value.placeHolder]: 'تفاصيل القسم',

	// ################# Assets #################
	//
	[tokens.settings.asset.form.asset_field.name]: 'الاسم',
	[tokens.settings.asset.form.asset_field.helperText]: ' ',
	[tokens.settings.asset.form.asset_field.placeHolder]: 'اسم الفئة',
	//
	[tokens.settings.asset.form.asset_value.name]: 'التفاصيل',
	[tokens.settings.asset.form.asset_value.helperText]: ' ',
	[tokens.settings.asset.form.asset_value.placeHolder]: 'تفاصيل الفئة',

	[tokens.settings.asset.header.asset_category]: 'فئة الأصل',
	[tokens.settings.asset.add_text]: 'إضافة فئة أخرى',

	// ################# Work Location #################
	//
	[tokens.settings.work_location.form.work_location_field.name]: 'الاسم',
	[tokens.settings.work_location.form.work_location_field.helperText]: ' ',
	[tokens.settings.work_location.form.work_location_field.placeHolder]: 'اسم الموقع',
	//
	[tokens.settings.work_location.form.work_location_value.name]: 'التفاصيل',
	[tokens.settings.work_location.form.work_location_value.helperText]: ' ',
	[tokens.settings.work_location.form.work_location_value.placeHolder]: 'تفاصيل الموقع',

	[tokens.settings.work_location.header.work_location]: 'موقع العمل',
	[tokens.settings.work_location.add_text]: 'إضافة موقع آخر',

	// ################# Skill Set #################
	//
	[tokens.settings.skill_set.form.skill_set_field.name]: 'الاسم',
	[tokens.settings.skill_set.form.skill_set_field.helperText]: ' ',
	[tokens.settings.skill_set.form.skill_set_field.placeHolder]: 'اسم المهارة',
	//
	[tokens.settings.skill_set.form.skill_set_value.name]: 'الوصف',
	[tokens.settings.skill_set.form.skill_set_value.helperText]: ' ',
	[tokens.settings.skill_set.form.skill_set_value.placeHolder]: 'وصف المهارة',

	[tokens.settings.skill_set.header.skill_set]: 'مجموعة المهارات',
	[tokens.settings.skill_set.add_text]: 'أضف مهارة أخرى',

	// ################# Benefit Packages #################
	//
	[tokens.settings.benefit_package.form.benefit_package_field.name]: 'الاسم',
	[tokens.settings.benefit_package.form.benefit_package_field.helperText]: ' ',
	[tokens.settings.benefit_package.form.benefit_package_field.placeHolder]: 'اسم الباقة',
	//
	[tokens.settings.benefit_package.form.benefit_package_value.name]: 'التفاصيل',
	[tokens.settings.benefit_package.form.benefit_package_value.helperText]: ' ',
	[tokens.settings.benefit_package.form.benefit_package_value.placeHolder]: 'تفاصيل المهارة',

	[tokens.settings.benefit_package.header.benefit_package]: 'باقة الفوائد',
	[tokens.settings.benefit_package.add_text]: 'أضف فائدة أخرى',

	// ################# Auth Layout #################

	[tokens.authentication.layout.title]:
		'حولت مقابلاتنا إلى تجربة رائعة – بيبول بلس هو البطل الخارق للموارد البشرية الذي لم نكن نعلم أننا نحتاج إليه! 🦸‍️💥',
	[tokens.authentication.layout.sub_title]: '— ماكسي سباركلتون',
	[tokens.authentication.layout.heading]: 'مروّض المواهب في شركة فنوفيشنز كورب.',

	// authentication register
	[tokens.authentication.register.header.heading]: 'إنشاء حساب',
	[tokens.authentication.register.header.sub_heading]: 'ابدأ تجربتك المجانية لمدة 30 يومًا.',

	//
	[tokens.authentication.register.form.first_name.label]: 'الاسم الأول',
	[tokens.authentication.register.form.first_name.place_holder]: 'أدخل اسمك الأول',
	[tokens.authentication.register.form.first_name.required]: 'الاسم الأول مطلوب',

	//
	[tokens.authentication.register.form.last_name.label]: 'اسم العائلة',
	[tokens.authentication.register.form.last_name.place_holder]: 'أدخل اسم العائلة',
	[tokens.authentication.register.form.last_name.required]: 'اسم العائلة مطلوب',

	//
	[tokens.authentication.register.form.organization_name.label]: 'اسم المنظمة',
	[tokens.authentication.register.form.organization_name.place_holder]: 'أدخل اسم منظمتك',
	[tokens.authentication.register.form.organization_name.required]: 'اسم المنظمة مطلوب',

	//
	[tokens.authentication.register.form.email.label]: 'عنوان البريد الإلكتروني',
	[tokens.authentication.register.form.email.place_holder]: 'أدخل بريدك الإلكتروني',
	[tokens.authentication.register.form.email.invalid]: 'تنسيق البريد الإلكتروني غير صحيح',
	[tokens.authentication.register.form.email.required]: 'البريد الإلكتروني مطلوب',

	//
	[tokens.authentication.register.form.password.label]: 'كلمة المرور',
	[tokens.authentication.register.form.password.place_holder]: 'أدخل كلمة المرور',
	[tokens.authentication.register.form.password.length]: 'يجب أن تكون كلمة المرور على الأقل 8 أحرف',

	//
	[tokens.authentication.register.form.confirm_password.label]: 'تأكيد كلمة المرور',
	[tokens.authentication.register.form.confirm_password.place_holder]: 'تأكيد كلمة المرور',
	[tokens.authentication.register.form.confirm_password.required]: 'تأكيد كلمة المرور مطلوب',
	[tokens.authentication.register.form.confirm_password.match]: 'كلمة المرور غير متطابقة',

	//
	[tokens.authentication.register.form.register_button.text]: 'تسجيل',

	//
	[tokens.authentication.register.form.have_account.account_text]: 'هل لديك حساب بالفعل؟',
	[tokens.authentication.register.form.have_account.log_in_text]: 'تسجيل الدخول',

	// ################# login #################
	[tokens.authentication.login.header.heading]: 'تسجيل الدخول',
	[tokens.authentication.login.header.sub_heading]: 'مرحبًا بعودتك! الرجاء إدخال بياناتك.',

	//
	[tokens.authentication.login.form.email.label]: 'عنوان البريد الإلكتروني',
	[tokens.authentication.login.form.email.place_holder]: 'أدخل بريدك الإلكتروني',
	[tokens.authentication.login.form.email.invalid]: 'تنسيق البريد الإلكتروني غير صالح',
	[tokens.authentication.login.form.email.required]: 'البريد الإلكتروني مطلوب',

	//
	[tokens.authentication.login.form.password.label]: 'كلمة المرور',
	[tokens.authentication.login.form.password.place_holder]: 'أدخل كلمة المرور',
	[tokens.authentication.login.form.password.length]: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',

	//
	[tokens.authentication.login.form.forget_password.text]: 'نسيت كلمة المرور؟',
	//
	[tokens.authentication.login.form.login_button.text]: 'تسجيل الدخول',

	//
	[tokens.authentication.login.form.dont_have_account.account_text]: 'لا تمتلك حسابًا؟',
	[tokens.authentication.login.form.dont_have_account.register_text]: 'التسجيل',

	// ################# forget password #################
	[tokens.authentication.forget_password.header.heading]: 'هل نسيت كلمة المرور؟',
	[tokens.authentication.forget_password.header.sub_heading]:
		'الرجاء إدخال بريدك الإلكتروني لاستعادة كلمة المرور.',
	[tokens.authentication.forget_password.form.email.label]: 'عنوان البريد الإلكتروني',
	[tokens.authentication.forget_password.form.email.place_holder]: 'أدخل بريدك الإلكتروني',
	[tokens.authentication.forget_password.form.email.invalid]: 'تنسيق البريد الإلكتروني غير صالح',
	[tokens.authentication.forget_password.form.email.required]: 'البريد الإلكتروني مطلوب',
	[tokens.authentication.forget_password.form.reset_button.text]: 'إعادة تعيين كلمة المرور',

	[tokens.authentication.forget_password.form.back_to_login.back_text]: 'العودة إلى تسجيل الدخول',
	// ################## verify code ###################
	[tokens.authentication.verify_code.header.heading]: 'تحقق من الرمز',
	[tokens.authentication.verify_code.form.title]: 'الرمز',
	[tokens.authentication.verify_code.form.length]: 'يجب أن يكون الرمز 6 أحرف',
	[tokens.authentication.verify_code.form.verify_button.text]: 'تحقق',
	[tokens.authentication.verify_code.form.back_to_login.back_text]: 'العودة إلى تسجيل الدخول',
	// ################# reset passsword #################
	[tokens.authentication.reset_password.header.heading]: 'تعيين كلمة مرور جديدة',
	[tokens.authentication.reset_password.header.sub_heading]: 'يجب ألا تقل كلمة المرور عن 8 أحرف.',

	//
	[tokens.authentication.reset_password.form.password.label]: 'كلمة المرور',
	[tokens.authentication.reset_password.form.password.place_holder]: 'أدخل كلمة المرور الخاصة بك',
	[tokens.authentication.reset_password.form.password.length]: 'يجب ألا تقل كلمة المرور عن 8 أحرف',

	//
	[tokens.authentication.reset_password.form.confirm_password.label]: 'تأكيد كلمة المرور',
	[tokens.authentication.reset_password.form.confirm_password.place_holder]:
		'تأكيد كلمة المرور الخاصة بك',
	[tokens.authentication.reset_password.form.confirm_password.required]: 'تأكيد كلمة المرور مطلوب',
	[tokens.authentication.reset_password.form.confirm_password.match]: 'كلمة المرور غير متطابقة',
	//
	[tokens.authentication.reset_password.form.reset_password_button.text]: 'إعادة تعيين كلمة المرور',

	//
	[tokens.authentication.reset_password.form.back_to_login.back_text]: 'العودة إلى تسجيل الدخول',
}
