import { Widgets } from '@mui/icons-material'
import { Preference } from '@pages/employee/profile'
import UpcomingEvent from '@pages/employee/upcomingEvents/UpcomingEvents'

export const tokens = {
	common: {
		languageChanged: 'common.languageChanged',
		edit: 'common.edit',
		submit: 'common.submit',
		delete: 'common.delete',
		search: 'common.search',
		save_changes: 'common.save_changes',
		loading: 'common.loading',
		no_option: 'common.no_option',
		empty_state: {
			message: 'common.empty_state.message',
			subheading: 'common.empty_state.subheading',
		},
		toast_message: {
			record_added: 'common.toast_message.record_added',
			record_updated: 'common.toast_message.record_updated',
			server_error: 'common.toast_message.server_error',
		},
		by: 'common.by',
	},
	nav: {
		organization: 'nav.organization',
		recruitment: 'nav.recruitment',
		document_policy: 'nav.document_policy',
		employee: 'nav.employee',
		profile: 'nav.profile',
		academy: 'nav.academy',
		settings: 'nav.settings',
		asset: 'nav.asset',
		account: 'nav.account',
		analytics: 'nav.analytics',
		auth: 'nav.auth',
		blog: 'nav.blog',
		browse: 'nav.browse',
		calendar: 'nav.calendar',
		chat: 'nav.chat',
		checkout: 'nav.checkout',
		concepts: 'nav.concepts',
		contact: 'nav.contact',
		course: 'nav.course',
		create: 'nav.create',
		crypto: 'nav.crypto',
		customers: 'nav.customers',
		dashboard: 'nav.dashboard',
		details: 'nav.details',
		ecommerce: 'nav.ecommerce',
		edit: 'nav.edit',
		error: 'nav.error',
		feed: 'nav.feed',
		fileManager: 'nav.fileManager',
		files: 'nav.files',
		finance: 'nav.finance',
		fleet: 'nav.fleet',
		forgotPassword: 'nav.forgotPassword',
		invoiceList: 'nav.invoices',
		jobList: 'nav.jobList',
		kanban: 'nav.kanban',
		list: 'nav.list',
		login: 'nav.login',
		logistics: 'nav.logistics',
		mail: 'nav.mail',
		management: 'nav.management',
		orderList: 'nav.orders',
		overview: 'nav.overview',
		pages: 'nav.pages',
		postCreate: 'nav.postCreate',
		postDetails: 'nav.postDetails',
		postList: 'nav.postList',
		pricing: 'nav.pricing',
		productList: 'nav.products',
		register: 'nav.register',
		resetPassword: 'nav.resetPassword',
		socialMedia: 'nav.socialMedia',
		verifyCode: 'nav.verifyCode',
	},

	seo_titles: {
		auth: {
			register: 'seo_titles.auth.register',
			login: 'seo_titles.auth.login',
			forget_password: 'seo_titles.auth.forget_password',
			verify_code: 'seo_titles.auth.verify_code',
			reset_password: 'seo_titles.auth.reset_password',
		},
		dashboard: 'seo_titles.dashboard',
		assets: {
			add_asset: 'seo_titles.assets.add_asset',
			detail_asset: 'seo_titles.assets.detail_asset',
			list_asset: 'seo_titles.assets.list_asset',
		},
		employees: {
			create_emp: 'seo_titles.employees.create_emp',
			listing: 'seo_titles.employees.listing',
			profile: 'seo_titles.employees.profile',
			document: 'seo_titles.employees.document',
			onboarding: 'seo_titles.employees.onboarding',
			assets: 'seo_titles.employees.asset',
			preference: 'seo_titles.employees.preference',
		},
		organization_chart: 'seo_titles.organization_chart',
		policy: {
			list: 'seo_titles.policy.list',
			draft: 'seo_titles.policy.draft',
		},
		recruitment: {
			create_job: 'seo_titles.recruitment.create_job',
			list_job: 'seo_titles.recruitment.list_job',
			detail_job: 'seo_titles.recruitment.detail_job',
			candidate_listing: 'seo_titles.recruitment.candidate_listing',
			add_candidate: 'seo_titles.recruitment.add_candidate',
		},
		calendar: 'seo_titles.calendar',
	},

	asset: {
		header: {
			heading: 'asset.header.heading',
		},

		create_page: {
			heading: 'asset.create_page.heading',
			breadcrumbs: {
				parent: 'asset.create_page.breadcrumbs.parent',
				child: 'asset.create_page.breadcrumbs.child',
			},
		},

		detail_page: {
			breadcrumbs: {
				parent: 'asset.detail_page.breadcrumbs.parent',
				child: 'asset.detail_page.breadcrumbs.child',
			},
			asset_id: 'asset.asset_id',
		},

		update_page: {
			heading: 'asset.update_page.heading',
			breadcrumbs: {
				parent: 'asset.update_page.breadcrumbs.parent',
				child: 'asset.update_page.breadcrumbs.child',
			},
		},

		breadcrumbs: {
			asset: 'employee.asset.asset',
			dashboard: 'employee.asset.dashboard',
		},
		button: {
			add_text: 'asset.button.add_text',
			submit: 'asset.button.submit',
			cancel: 'asset.button.cancel',
			edit: 'asset.button.edit',
		},

		file_error: {
			size: 'asset.file_error.size',
			require: 'asset.file_error.require',
			no_of_files: 'asset.file_error.no_of_files',
		},

		status: {
			active: 'asset.status.active',
			deactivate: 'asset.status.deactivate',
		},

		search_slot: {
			filter: {
				name: 'asset.search_slot.filter.name',
				category: 'asset.search_slot.filter.category',
				status: 'asset.search_slot.filter.status',
				placeholder: 'asset.search_slot.filter.placeholder',
				asset_name: 'asset.search_slot.filter.asset_name',
			},
		},

		table_heading: {
			name: 'asset.table_heading.name',
			serial_no: 'asset.table_heading.serial_no',
			last_assigned: 'asset.table_heading.last_assigned',
			asset_value: 'asset.table_heading.asset_value',
			status: 'asset.table_heading.status',
			action: 'asset.table_heading.action',
		},

		feedback: {
			tabs: {
				activity: 'asset.feedback.tabs.activity',
				documents: 'asset.feedback.tabs.documents',
			},

			comment: {
				label: 'asset.feedback.comment.label',
				placeHolder: 'asset.feedback.comment.placeHolder',
			},
		},

		history_detail: {
			assigned_history: 'asset.history_detail.assigned_history',
			information: 'asset.history_detail.information',
			category: 'asset.history_detail.category',
			purchase_date: 'asset.history_detail.purchase_date',
			purchase_price: 'asset.history_detail.purchase_price',
			location: 'asset.history_detail.location',
		},

		form: {
			asset_name: {
				label: 'asset.form.asset_name.label',
				placeholder: 'assets.form.asset_name.label',
				helperText: 'asset.form.asset_name.helperText',
			},
			fileUpload: {
				button_text: 'asset.form.fileUpload.button_text',
				caption: 'asset.form.fileUpload.caption',
				helperText: 'asset.form.fileUpload.helperText',
			},
			asset_id: {
				label: 'asset.form.asset_id.label',
				helperText: 'asset.form.asset_id.helperText',
			},
			status: {
				label: 'asset.form.status.label',
				helperText: 'asset.form.status.helperText',
			},
			employee: {
				label: 'asset.form.employee.label',
				placeholder: 'asset.form.employee.placeholder',
			},
			department: {
				label: 'asset.form.department.label',
				placeholder: 'asset.form.department.placeholder',

				helperText: 'asset.form.department.helperText',
			},
			category: {
				label: 'asset.form.category.label',
				placeholder: 'asset.form.category.placeholder',
				helperText: 'asset.form.category.helperText',
			},
			allocation_date: {
				label: 'asset.form.allocation_date.label',
			},
			purchase_date: {
				label: 'asset.form.purchase_date.label',
			},
			purchase_price: {
				label: 'asset.form.purchase_price.label',
			},
			purchase_currency: {
				label: 'asset.form.purchase_currency.label',
				placeholder: 'asset.form.purchase_currency.placeholder',
			},
			location: {
				label: 'asset.form.location.label',
				placeholder: 'asset.form.location.placeholder',
			},
			serial_no: {
				label: 'asset.form.serial_no.label',
			},
			manufacture: {
				label: 'asset.form.manufacture.label',
				placeholder: 'asset.form.manufacture.placeholder',
			},
			model: {
				label: 'asset.form.model.label',
				placeholder: 'asset.form.model.placeholder',
			},
			description: {
				label: 'asset.form.description.label',
				placeholder: 'asset.form.description.placeholder',
			},
		},

		in: 'asset.in',
	},

	organizational_chart: {
		heading: 'organizational_chart.heading',
		breadcrumbs: {
			parent: 'organizational_chart.breadcrumbs.parent',
			child: 'organizational_chart.breadcrumbs.child',
		},
		search_filed: {
			label: 'organizational_chart.search_filed.label',
			placeholder: 'organizational_chart.search_filed.placeholder',
		},
		table: {
			name: 'organizational_chart.table.name',
			department: 'organizational_chart.table.department',
			designation: 'organizational_chart.table.designation',
			joining_date: 'organizational_chart.table.joining_date',
		},
	},

	employee: {
		listing: {
			header: {
				heading: 'employee.listing.header.heading',
			},

			Widgets: {
				total_emp: 'employee.listing.widgets.total_emp',
				logged_in_emp: 'employee.listing.widgets.logged_in_emp',
				company_health: 'employee.listing.widgets.company_health',
				active_last: 'employee.listing.widgets.active_last',
			},

			breadcrumbs: {
				employee: 'employee.listing.breadcrumbs.employee',
				dashboard: 'employee.listing.breadcrumbs.dashboard',
			},

			button: {
				add_employee: 'employee.listing.button.add_employee',
			},
			department: {
				search_emp: {
					place_holder: 'employee.listing.department.search_emp.place_holder',
				},
				sort: {
					label: 'employee.listing.department.sort.label',
				},
			},
			listing_table: {
				table: {
					name: 'employee.listing.listing_table.table.name',
					designation: 'employee.listing.listing_table.table.designation',
					address: 'employee.listing.listing_table.table.address',
					last_activity: 'employee.listing.listing_table.table.last_activity',
					action: 'employee.listing.listing_table.table.action',
				},
			},
		},

		create_employee: {
			breadcrumbs: {
				employee: 'employee.create_employee.breadcrumbs.employee',
				dashboard: 'employee.create_employee.breadcrumbs.dashboard',
				add_employee: 'employee.create_employee.breadcrumbs.add_employee',
			},
			header: {
				heading: 'employee.create_employee.header.heading',
			},

			form: {
				personal_info: {
					title: 'employee.create_employee.form.personal_info.title',
					pic_change: 'employee.create_employee.form.personal_info.pic_change',

					first_name: {
						label: 'employee.create_employee.form.personal_info.first_name.label',
						place_holder: 'employee.create_employee.form.personal_info.first_name.place_holder',
						required: 'employee.create_employee.form.personal_info.first_name.required',
					},
					last_name: {
						label: 'employee.create_employee.form.personal_info.last_name.label',
						place_holder: 'employee.create_employee.form.personal_info.last_name.place_holder',
						required: 'employee.create_employee.form.personal_info.last_name.required',
					},
					cnic: {
						label: 'employee.create_employee.form.personal_info.cnic.label',
						place_holder: 'employee.create_employee.form.personal_info.cnic.place_holder',
					},
					dob: {
						label: 'employee.create_employee.form.personal_info.dob.label',
						required: 'employee.create_employee.form.personal_info.dob.required',
					},
					gender: {
						label: 'employee.create_employee.form.personal_info.gender.label',
						place_holder: 'employee.create_employee.form.personal_info.gender.place_holder',
						required: 'employee.create_employee.form.personal_info.gender.required',
					},
					about: {
						label: 'employee.create_employee.form.personal_info.about.label',
						place_holder: 'employee.create_employee.form.personal_info.about.place_holder',
					},
					enable_ceo: {
						heading: 'employee.create_employee.form.personal_info.enable_ceo.heading',
						sub_heading1: 'employee.create_employee.form.personal_info.enable_ceo.sub_heading1',
						sub_heading2: 'employee.create_employee.form.personal_info.enable_ceo.sub_heading2',
					},
				},
				contact_info: {
					title: 'employee.create_employee.form.contact_info.title',

					email: {
						label: 'employee.create_employee.form.contact_info.email.label',
						place_holder: 'employee.create_employee.form.contact_info.email.place_holder',
						required: 'employee.create_employee.form.contact_info.email.required',
					},
					password: {
						label: 'employee.create_employee.form.contact_info.password.label',
						place_holder: 'employee.create_employee.form.contact_info.password.place_holder',
						error_message: 'employee.create_employee.form.contact_info.password.error_message',
						required: 'employee.create_employee.form.contact_info.password.required',
					},
					number: {
						label: 'employee.create_employee.form.contact_info.number.label',
						place_holder: 'employee.create_employee.form.contact_info.number.place_holder',
					},

					emergency_number: {
						label: 'employee.create_employee.form.contact_info.emergency_number.label',
						place_holder:
							'employee.create_employee.form.contact_info.emergency_number.place_holder',
					},
					street_address: {
						label: 'employee.create_employee.form.contact_info.street_address.label',
						place_holder: 'employee.create_employee.form.contact_info.street_address.place_holder',
					},
					city: {
						label: 'employee.create_employee.form.contact_info.city.label',
						place_holder: 'employee.create_employee.form.contact_info.city.place_holder',
					},
					state: {
						label: 'employee.create_employee.form.contact_info.state.label',
						place_holder: 'employee.create_employee.form.contact_info.state.place_holder',
					},
					postal_code: {
						label: 'employee.create_employee.form.contact_info.postal_code.label',
					},
					select_country: {
						label: 'employee.create_employee.form.contact_info.select_country.label',
						place_holder: 'employee.create_employee.form.contact_info.select_country.place_holder',
					},
				},
				employment_details: {
					title: 'employee.create_employee.form.employment_details.title',

					emp_id: {
						label: 'employee.create_employee.form.employment_details.emp_id.label',
						place_holder: 'employee.create_employee.form.employment_details.emp_id.place_holder',
						required: 'employee.create_employee.form.employment_details.emp_id.required',
					},

					job_title: {
						label: 'employee.create_employee.form.employment_details.job_title.label',
						place_holder: 'employee.create_employee.form.employment_details.job_title.place_holder',
						required: 'employee.create_employee.form.employment_details.job_title.required',
					},
					degree: {
						label: 'employee.create_employee.form.employment_details.degree.label',
						place_holder: 'employee.create_employee.form.employment_details.degree.place_holder',
					},
					institute: {
						label: 'employee.create_employee.form.employment_details.institute.label',
						place_holder: 'employee.create_employee.form.employment_details.institute.place_holder',
					},
					hire_date: {
						label: 'employee.create_employee.form.employment_details.hire_date.label',
					},
					probation_end_date: {
						label: 'employee.create_employee.form.employment_details.probation_end_date.label',
					},
					termination_date: {
						label: 'employee.create_employee.form.employment_details.termination_date.label',
					},
					employment_status: {
						label: 'employee.create_employee.form.employment_details.employment_status.label',
						placeholder:
							'employee.create_employee.form.employment_details.employment_status.placeholder',
						required: 'employee.create_employee.form.employment_details.employment_status.required',
					},
					employment_type: {
						label: 'employee.create_employee.form.employment_details.employment_type.label',
						placeholder:
							'employee.create_employee.form.employment_details.employment_type.placeholder',
						required: 'employee.create_employee.form.employment_details.employment_type.required',
					},
					manager: {
						label: 'employee.create_employee.form.employment_details.manager.label',
						place_holder: 'employee.create_employee.form.employment_details.manager.place_holder',

						no_record: 'employee.create_employee.form.employment_details.manager.no_record',
						select_none: 'employee.create_employee.form.employment_details.manager.select_none',
					},
					department: {
						label: 'employee.create_employee.form.employment_details.department.label',
						place_holder:
							'employee.create_employee.form.employment_details.department.place_holder',
						no_record: 'employee.create_employee.form.employment_details.department.no_record',
					},

					work_location: {
						label: 'employee.create_employee.form.employment_details.work_location.label',
						place_holder:
							'employee.create_employee.form.employment_details.work_location.place_holder',
					},
				},
				compensation: {
					title: 'employee.create_employee.form.compensation.title',
					salary: {
						label: 'employee.create_employee.form.compensation.salary.label',
						place_holder: 'employee.create_employee.form.compensation.salary.place_holder',
					},
					pay_frequency: {
						label: 'employee.create_employee.form.compensation.pay_frequency.label',
						place_holder: 'employee.create_employee.form.compensation.pay_frequency.place_holder',
					},
					currency: {
						label: 'employee.create_employee.form.compensation.currency.label',
						place_holder: 'employee.create_employee.form.compensation.currency.place_holder',
					},

					benefit_package: {
						label: 'employee.create_employee.form.compensation.benefit_package.label',
						place_holder: 'employee.create_employee.form.compensation.benefit_package.place_holder',
					},
				},
				work_schedule: {
					title: 'employee.create_employee.form.work_schedule.title',
					work_hours: {
						label: 'employee.create_employee.form.work_schedule.work_hours.label',
						place_holder: 'employee.create_employee.form.work_schedule.work_hours.place_holder',
					},
					work_days: {
						label: 'employee.create_employee.form.work_schedule.work_days.label',
						place_holder: 'employee.create_employee.form.work_schedule.work_days.place_holder',
					},
					timezone: {
						label: 'employee.create_employee.form.work_schedule.timezone.label',
						place_holder: 'employee.create_employee.form.work_schedule.timezone.place_holder',
					},
				},
				cancel_button: {
					btn_text: 'employee.create_employee.form.cancel_button.btn_text',
				},

				create: {
					btn_text: 'employee.create_employee.form.create.btn_text',
				},
				save_changes: {
					btn_text: 'employee.create_employee.form.save_changes.btn_text',
				},
			},
		},

		profile_layout: {
			header: {
				status: 'employee.profile_layout.header.status',
				id_heading: 'employee.profile_layout.header.id_heading',
				id_code: 'employee.profile_layout.header.id_code',
			},
			breadcrumbs: {
				dashboard: 'employee.profile_layout.breadcrumbs.dashboard',

				employee: 'employee.profile_layout.breadcrumbs.employee',
			},

			button: {
				action: 'employee.profile_layout.button.action',
				whatsapp: 'employee.profile_layout.button.whatsapp',
				phone: 'employee.profile_layout.button.phone',
				gmail: 'employee.profile_layout.button.gmail',
			},

			tabs: {
				profile: {
					label: 'employee.profile_layout.tabs.profile.label',
				},
				documents: {
					label: 'employee.profile_layout.tabs.documents.label',
				},
				onboarding: {
					label: 'employee.profile_layout.tabs.onboarding.label',

					progress: 'employee.profile_layout.tabs.progress',
				},
				assets: {
					label: 'employee.profile_layout.tabs.assets.label',
				},
				comments: {
					label: 'employee.profile_layout.tabs.comments.label',
				},
				preferences: {
					label: 'employee.profile_layout.tabs.preferences.label',
				},
			},
		},

		profile: {
			quick_shot: {
				heading: 'employee.profile.quick_shot.heading',
			},
			about_card: {
				read_more: 'employee.profile.about_card.read_more',
				read_less: 'employee.profile.about_card.read_less',
				about_title: 'employee.profile.about_card.about_title',
				salary_title: 'employee.profile.about_card.salary_title',
				pkr: 'employee.profile.about_card.pkr',
				department_title: 'employee.profile.about_card.department_title',
				team_title: 'employee.profile.about_card.team_title',
			},
			unavailable_card: {
				unavailable_heading: 'employee.profile.unavailable_card.unavailable_heading',
				unavailable_text: 'employee.profile.unavailable_card.unavailable_text',
				unavailable_date: 'employee.profile.unavailable_card.unavailable_date',
			},
			suspended_card: {
				suspended_heading: 'employee.profile.suspended_card.suspended_heading',
				suspended_text: 'employee.profile.suspended_card.suspended_text',
			},
		},

		document: {
			search_input: {
				place_holder: 'employee.document.search_input.place_holder',
			},

			category: {
				label: 'employee.document.category.label',
				place_holder: 'employee.document.category.place_holder',
				required: 'employee.document.category.required',
			},
			upload_modal: {
				add_document: 'employee.document.upload_modal.add_document',
				upload_document: 'employee.document.upload_modal.add_document',
				edit: 'employee.document.upload_modal.edit',
				file_size: 'employee.document.upload_modal.file_size',
				delete: 'employee.document.upload_modal.delete',
			},
			document_table: {
				name: 'employee.document.document_table.name',
				last_update: 'employee.document.document_table.last_update',
				created_by: 'employee.document.document_table.created_by',
				actions: 'employee.document.document_table.actions',
				record_not_found: 'employee.document.document_table.record_not_found',
			},

			buttons: {
				save_changes: 'employee.document.save_changes',
				submit: 'employee.document.submit',
			},
		},

		Preferences: {
			cancel: 'employee.preferences.cancel',
			save_changes: 'employee.preferences.save_changes',
			submit: 'employee.preferences.submit',
		},
	},

	settings: {
		tabs: {
			general: 'settings.tabs.general',
			modules: 'settings.tabs.modules',
			asset: 'settings.tabs.asset',
			work_location: 'settings.tabs.work_location',
			skill_set: 'settings.tabs.skill_set',
			benefit_package: 'settings.tabs.benefit_package',
			onboarding: 'settings.tabs.onboarding',
			expenses: 'settings.tabs.expenses',
			localization: 'settings.tabs.localization',
			roles_Permissions: 'settings.tabs.roles_Permissions',
			personalization: 'settings.tabs.personalization',
			notifications: 'settings.tabs.notifications',
			communication: 'settings.tabs.communication',
			backup_Recovery: 'settings.tabs.backup_Recovery',
			advanced: 'settings.tabs.advanced',
			department: 'settings.tabs.department',
			document_policy: 'settings.tabs.document_policy',
			pipeline_stages: 'settings.tabs.pipeline_stages',
		},

		general: {
			headers: {
				company_info: 'settings.general.headers.company_info',
				office_info: 'settings.general.headers.office_info',
				departments: 'settings.general.headers.departments',
			},
			add_text: 'settings.general.add_text',

			list: {
				field: 'settings.general.list.field',
				description: 'settings.general.list.description',
			},

			form: {
				avatar: {
					name: 'settings.general.form.avatar.name',
					placeHolder: 'settings.general.form.avatar.helperText',
					helperText: 'settings.general.form.avatar.placeHolder',
				},
				company_name: {
					name: 'settings.general.form.company_name.name',
					placeHolder: 'settings.general.form.company_name.helperText',
					helperText: 'settings.general.form.company_name.placeHolder',
				},

				first_name: {
					name: 'settings.general.form.first_name.name',
					placeHolder: 'settings.general.form.first_name.helperText',
					helperText: 'settings.general.form.first_name.placeHolder',
				},
				last_name: {
					name: 'settings.general.form.last_name.name',
					placeHolder: 'settings.general.form.last_name.helperText',
					helperText: 'settings.general.form.last_name.placeHolder',
				},
				website: {
					name: 'settings.general.form.website.name',
					placeHolder: 'settings.general.form.website.helperText',
					helperText: 'settings.general.form.website.placeHolder',
				},
				email: {
					name: 'settings.general.form.email.name',
					placeHolder: 'settings.general.form.email.helperText',
					helperText: 'settings.general.form.email.placeHolder',
				},
				phone_number: {
					name: 'settings.general.form.phone_number.name',
					placeHolder: 'settings.general.form.phone_number.helperText',
					helperText: 'settings.general.form.phone_number.placeHolder',
				},
				company_description: {
					name: 'settings.general.form.company_description.name',
					placeHolder: 'settings.general.form.company_description.helperText',
					helperText: 'settings.general.form.company_description.placeHolder',
				},

				office_add: {
					name: 'settings.general.form.office_add.name',
					helperText: 'settings.general.form.office_add.helperText',
					placeHolder: 'settings.general.form.office_add.placeHolder',
				},
				city: {
					name: 'settings.general.form.city.name',
					helperText: 'settings.general.form.city.helperText',
					placeHolder: 'settings.general.form.city.placeHolder',
				},
				zip_code: {
					name: 'settings.general.form.zip_code.name',
					helperText: 'settings.general.form.zip_code.helperText',
					placeHolder: 'settings.general.form.zip_code.placeHolder',
				},
				country: {
					name: 'settings.general.form.country.name',
					helperText: 'settings.general.form.country.helperText',
					placeHolder: 'settings.general.form.country.placeHolder',
				},
				time_zone: {
					name: 'settings.general.form.time_zone.name',
					helperText: 'settings.general.form.time_zone.helperText',
					placeHolder: 'settings.general.form.time_zone.placeHolder',
				},

				depart_field: {
					name: 'settings.general.form.depart_field.name',
					helperText: 'settings.general.form.depart_field.helperText',
					placeHolder: 'settings.general.form.depart_field.placeHolder',
				},
				depart_value: {
					name: 'settings.general.form.depart_value.name',
					helperText: 'settings.general.form.depart_value.helperText',
					placeHolder: 'settings.general.form.depart_value.placeHolder',
				},
			},
		},
		asset: {
			header: {
				asset_category: 'settings.asset.header.asset_category',
			},
			add_text: 'settings.asset.add_text',
			form: {
				asset_field: {
					name: 'settings.asset.form.asset_field.name',
					helperText: 'settings.asset.form.asset_field.helperText',
					placeHolder: 'settings.asset.form.asset_field.placeHolder',
				},
				asset_value: {
					name: 'settings.asset.form.asset_value.name',
					helperText: 'settings.asset.form.asset_value.helperText',
					placeHolder: 'settings.asset.form.asset_value.placeHolder',
				},
			},
		},

		policy_category: {
			header: {
				policy_category: 'settings.asset.header.policy_category',
			},
			add_text: 'settings.policy_category.add_text',
			form: {
				policy_category_field: {
					name: 'settings.policy_category.form.policy_category_field.name',
					helperText: 'settings.policy_category.form.policy_category_field.helperText',
					placeHolder: 'settings.policy_category.form.policy_category_field.placeHolder',
				},
				policy_category_value: {
					name: 'settings.policy_category.form.policy_category_value.name',
					helperText: 'settings.policy_category.form.policy_category_value.helperText',
					placeHolder: 'settings.policy_category.form.policy_category_value.placeHolder',
				},
			},
		},

		pipeline_stages: {
			header: {
				pipeline_stages: 'settings.asset.header.pipeline_stages',
			},
			add_text: 'settings.pipeline_stages.add_text',
			form: {
				pipeline_stages_field: {
					name: 'settings.pipeline_stages.form.pipeline_stages_field.name',
					helperText: 'settings.pipeline_stages.form.pipeline_stages_field.helperText',
					placeHolder: 'settings.pipeline_stages.form.pipeline_stages_field.placeHolder',
				},
				pipeline_stages_value: {
					name: 'settings.pipeline_stages.form.pipeline_stages_value.name',
					helperText: 'settings.pipeline_stages.form.pipeline_stages_value.helperText',
					placeHolder: 'settings.pipeline_stages.form.pipeline_stages_value.placeHolder',
				},
			},
		},

		work_location: {
			header: {
				work_location: 'settings.work_location.header.work_location',
			},
			add_text: 'settings.work_location.add_text',
			form: {
				work_location_field: {
					name: 'settings.work_location.form.work_location_field.name',
					helperText: 'settings.work_location.form.work_location_field.helperText',
					placeHolder: 'settings.work_location.form.work_location_field.placeHolder',
				},
				work_location_value: {
					name: 'settings.work_location.form.work_location_value.name',
					helperText: 'settings.work_location.form.work_location_value.helperText',
					placeHolder: 'settings.work_location.form.work_location_value.placeHolder',
				},
			},
		},

		skill_set: {
			header: {
				skill_set: 'settings.skill_set.header.skill_set',
			},
			add_text: 'settings.skill_set.add_text',
			form: {
				skill_set_field: {
					name: 'settings.skill_set.form.skill_set_field.name',
					helperText: 'settings.skill_set.form.skill_set_field.helperText',
					placeHolder: 'settings.skill_set.form.skill_set_field.placeHolder',
				},
				skill_set_value: {
					name: 'settings.skill_set.form.skill_set_value.name',
					helperText: 'settings.skill_set.form.skill_set_value.helperText',
					placeHolder: 'settings.skill_set.form.skill_set_value.placeHolder',
				},
			},
		},

		benefit_package: {
			header: {
				benefit_package: 'settings.benefit_package.header.benefit_package',
			},
			add_text: 'settings.benefit_package.add_text',
			form: {
				benefit_package_field: {
					name: 'settings.benefit_package.form.benefit_package_field.name',
					helperText: 'settings.benefit_package.form.benefit_package_field.helperText',
					placeHolder: 'settings.benefit_package.form.benefit_package_field.placeHolder',
				},
				benefit_package_value: {
					name: 'settings.benefit_package.form.benefit_package_value.name',
					helperText: 'settings.benefit_package.form.benefit_package_value.helperText',
					placeHolder: 'settings.benefit_package.form.benefit_package_value.placeHolder',
				},
			},
		},
		onboarding: {
			header: 'settings.onboarding.header',

			add_text: 'settings.onboarding.add_text',
			rem_text: 'settings.onboarding.rem_text',
			form: {
				title: {
					name: 'settings.onboarding.form.title.name',
					helperText: 'settings.onboarding.form.title.helperText',
					placeHolder: 'settings.onboarding.form.title.placeHolder',
				},

				mandatory: {
					name: 'settings.onboarding.form.mandatory.name',
					helperText: 'settings.onboarding.form.mandatory.helperText',
					placeHolder: 'settings.onboarding.form.mandatory.placeHolder',
				},

				priority: {
					name: 'settings.onboarding.form.priority.name',
					helperText: 'settings.onboarding.form.priority.helperText',
					placeHolder: 'settings.onboarding.form.priority.placeHolder',
				},

				assignee: {
					name: 'settings.onboarding.form.assignee.name',
					helperText: 'settings.onboarding.form.assignee.helperText',
					placeHolder: 'settings.onboarding.form.assignee.placeHolder',
				},
				description: {
					name: 'settings.onboarding.form.description.name',
					helperText: 'settings.onboarding.form.description.helperText',
					placeHolder: 'settings.onboarding.form.description.placeHolder',
				},
			},
		},
	},
	recruitment: {
		add_job: {
			post: 'recruitment.add_job.post',
			headers: {
				job_details: 'recruitment.add_job.headers.job_details',
				additional_information: 'recruitment.add_job.headers.additional_information',
			},
			form: {
				job_title: {
					name: 'recruitment.add_job.form.job_title.name',
					placeHolder: 'recruitment.add_job.form.job_title.helperText',
					helperText: 'recruitment.add_job.form.job_title.placeHolder',
					required: 'recruitment.add_job.form.job_title.required',
				},
				department: {
					name: 'recruitment.add_job.form.department.name',
					placeHolder: 'recruitment.add_job.form.department.helperText',
					helperText: 'recruitment.add_job.form.department.placeHolder',
				},
				job_description: {
					name: 'recruitment.add_job.form.job_description.name',
					placeHolder: 'recruitment.add_job.form.job_description.helperText',
					helperText: 'recruitment.add_job.form.job_description.placeHolder',
				},
				short_description: {
					name: 'recruitment.add_job.form.short_description.name',
					placeHolder: 'recruitment.add_job.form.short_description.helperText',
					helperText: 'recruitment.add_job.form.short_description.placeHolder',
				},
				location: {
					name: 'recruitment.add_job.form.location.name',
					placeHolder: 'recruitment.add_job.form.location.helperText',
					helperText: 'recruitment.add_job.form.location.placeHolder',
				},
				job_id: {
					name: 'recruitment.add_job.form.job_id.name',
					placeHolder: 'recruitment.add_job.form.job_id.helperText',
					helperText: 'recruitment.add_job.form.job_id.placeHolder',
				},
				employment_type: {
					name: 'recruitment.add_job.form.employment_type.name',
					placeHolder: 'recruitment.add_job.form.employment_type.helperText',
					helperText: 'recruitment.add_job.form.employment_type.placeHolder',
				},
				salary_range: {
					name: 'recruitment.add_job.form.salary_range.name',
					placeHolder: 'recruitment.add_job.form.salary_range.helperText',
					helperText: 'recruitment.add_job.form.salary_range.placeHolder',
				},
				currency: {
					name: 'recruitment.add_job.form.currency.name',
					placeHolder: 'recruitment.add_job.form.currency.helperText',
					helperText: 'recruitment.add_job.form.currency.placeHolder',
				},
				skill_set: {
					label: 'recruitment.add_job.form.skill_set.label',
					place_holder: 'recruitment.add_job.form.skill_set.place_holder',
				},
				experience_level: {
					name: 'recruitment.add_job.form.experience_level.name',
					placeHolder: 'recruitment.add_job.form.experience_level.helperText',
					helperText: 'recruitment.add_job.form.experience_level.placeHolder',
				},

				hiring_manager: {
					label: 'recruitment.add_job.form.hiring_manager.label',
					place_holder: 'recruitment.add_job.form.hiring_manager.place_holder',
				},
				travel_requirement: {
					name: 'recruitment.add_job.form.travel_requirement.name',
					placeHolder: 'recruitment.add_job.form.travel_requirement.helperText',
					helperText: 'recruitment.add_job.form.travel_requirement.placeHolder',
				},
				application_email: {
					name: 'recruitment.add_job.form.application_email.name',
					placeHolder: 'recruitment.add_job.form.application_email.helperText',
					helperText: 'recruitment.add_job.form.application_email.placeHolder',
					mail_message: 'recruitment.add_job.form.application_email.mail.message',
				},
			},

			buttons: {
				cancel: 'recruitment.add_job.button.cancel',
				publish: 'recruitment.add_job.button.publish',
			},
		},
		dashboard: {
			main_heading: 'recruitment.dashboard.main_heading',
			status: {
				active_jobs: 'recruitment.dashboard.active_jobs',
				applicants: 'recruitment.dashboard.applicants',
				company_health: 'recruitment.dashboard.company_health',
				activity: 'recruitment.dashboard.activity',
			},
			job_list_heading: {
				name: 'recruitment.dashboard.name',
				pipeline: 'recruitment.dashboard.pipeline',
				posted: 'recruitment.dashboard.posted',
				hiring: 'recruitment.dashboard.hiring',
				manager: 'recruitment.dashboard.manager',
				status: 'recruitment.dashboard.status',
				actions: 'recruitment.dashboard.actions',
			},
			search: 'recruitment.dashboard.search',
			search_helper: 'recruitment.dashboard.search_helper',
			add_job: 'recruitment.dashboard.add_job',
			extra_applicants: 'recruitment.dashboard.extra_applicants',
			s: 'recruitment.dashboard.s',
		},
		job_detail: {
			main_heading: 'recruitment.job_detail.main_heading',
			tabs: {
				candidates: 'recruitment.job_detail.tabs.candidates',
				job_details: 'recruitment.job_detail.tabs.job_details',
				magicAssessment: 'recruitment.job_detail.tabs.magicAssessment',
				timeline: 'recruitment.job_detail.tabs.timeline',
				add_new: 'recruitment.job_detail.tabs.add_new',
			},
			add_candidate: 'recruitment.job_detail.add_candidate',
			candidate: {
				pipelineDropdown: 'recruitment.job_detail.candidate.pipelineDropdown',
				tabs: {
					summary: 'recruitment.job_detail.candidate.summary',
					resume: 'recruitment.job_detail.candidate.resume',
					notes: 'recruitment.job_detail.candidate.notes',
					activity: 'recruitment.job_detail.candidate.activity',
				},
				summary: {
					assessments_btn: 'recruitment.job_detail.candidate.summary.assessments_btn',
					para_1: 'recruitment.job_detail.candidate.summary.para_1',
					para_2: 'recruitment.job_detail.candidate.summary.para_2',
				},
				note: {
					comment: {
						name: 'recruitment.job_detail.candidate.comment.note.name',
						placeHolder: 'recruitment.job_detail.candidate.comment.note.placeHolder',
						helperText: 'recruitment.job_detail.candidate.comment.note.helperText',
					},
				},
				activity: {
					man_heading: 'recruitment.job_detail.candidate.activity.man_heading',
					helperText: 'recruitment.job_detail.candidate.activity.helperText',
				},
			},
		},

		add_candidate: {
			title: 'recruitment.add_candidate.title',

			form: {
				first_name: {
					label: 'recruitment.add_candidate.form.first_name.label',
					place_holder: 'recruitment.add_candidate.form.first_name.label',
				},
				last_name: {
					label: 'recruitment.add_candidate.form.last_name.label ',
					place_holder: 'recruitment.add_candidate.form.last_name.place_holder',
				},
				email: {
					label: 'recruitment.add_candidate.form.email.label ',
					place_holder: 'recruitment.add_candidate.form.email.place_holder',
				},
				phone_number: {
					label: 'recruitment.add_candidate.form.phone_number.label ',
					place_holder: 'recruitment.add_candidate.form.phone_number.place_holder',
				},
				location: {
					label: 'recruitment.add_candidate.form.location.label ',
					place_holder: 'recruitment.add_candidate.form.location.place_holder',
				},
				Pipeline_Stage: {
					label: 'recruitment.add_candidate.form.Pipeline_Stage.label ',
					place_holder: 'recruitment.add_candidate.form.Pipeline_Stage.place_holder',
				},
			},
		},
	},

	authentication: {
		layout: {
			title: 'authentication.layout.title',
			sub_title: 'authentication.layout.sub_title',
			heading: 'authentication.layout.heading',
		},

		register: {
			header: {
				heading: 'authentication.register.header.heading',
				sub_heading: 'authentication.register.header.sub_heading',
			},
			form: {
				first_name: {
					label: 'authentication.register.form.first_name.label',
					place_holder: 'authentication.register.form.first_name.place_holder',
					required: 'authentication.register.form.first_name.required',
				},
				last_name: {
					label: 'authentication.register.form.last_name.label',
					place_holder: 'authentication.register.form.last_name.place_holder',
					required: 'authentication.register.form.last_name.required',
				},
				organization_name: {
					label: 'authentication.register.form.organization_name.label',
					place_holder: 'authentication.register.form.organization_name.place_holder',
					required: 'authentication.register.form.organization_name.required',
				},
				email: {
					label: 'authentication.register.form.email.label',
					place_holder: 'authentication.register.form.email.place_holder',
					invalid: 'authentication.register.form.email.invalid',
					required: 'authentication.register.form.email.required',
				},
				password: {
					label: 'authentication.register.form.password.label',
					place_holder: 'authentication.register.form.password.place_holder',
					length: 'authentication.register.form.password.length',
				},
				confirm_password: {
					label: 'authentication.register.form.confirm_password.label',
					place_holder: 'authentication.register.form.confirm_password.place_holder',
					required: 'authentication.register.form.confirm_password.required',
					match: 'authentication.register.form.confirm_password.match',
				},

				register_button: {
					text: 'authentication.register.register_button.text',
				},
				have_account: {
					account_text: 'authentication.register.form.have_account.account_text',
					log_in_text: 'authentication.register.form.have_account.log_in_text',
				},
			},
		},

		login: {
			header: {
				heading: 'authentication.login.header.heading',
				sub_heading: 'authentication.login.header.sub_heading',
			},
			form: {
				email: {
					label: 'authentication.login.form.email.label',
					place_holder: 'authentication.login.form.email.place_holder',
					invalid: 'authentication.login.form.email.invalid',
					required: 'authentication.login.form.email.required',
				},
				password: {
					label: 'authentication.login.form.password.label',
					place_holder: 'authentication.login.form.password.place_holder',
					length: 'authentication.login.form.password.length',
				},
				forget_password: {
					text: 'authentication.login.form.forget_password.text',
				},
				login_button: {
					text: 'authentication.login.login_button.text',
				},
				dont_have_account: {
					account_text: 'authentication.register.form.dont_have_account.account_text',
					register_text: 'authentication.register.form.dont_have_account.register_text',
				},
			},
		},

		forget_password: {
			header: {
				heading: 'authentication.forget_password.header.heading',
				sub_heading: 'authentication.forget_password.header.sub_heading',
			},
			form: {
				email: {
					label: 'authentication.forget_password.form.email.label',
					place_holder: 'authentication.forget_password.form.email.place_holder',
					invalid: 'authentication.forget_password.form.email.invalid',
					required: 'authentication.forget_password.form.email.required',
				},
				reset_button: {
					text: 'authentication.forget_password.reset_button.text',
				},
				back_to_login: {
					back_text: 'authentication.forget_password.form.back_to_login.back_text',
				},
			},
		},

		verify_code: {
			header: {
				heading: 'authentication.verify_code.header.heading',
			},

			form: {
				title: 'authentication.verify_code.form.title',
				length: 'authentication.verify_code.form.length',
				verify_button: {
					text: 'authentication.verify_code.form.verify_button.text',
				},
				back_to_login: {
					back_text: 'authentication.forget_password.form.back_to_login.back_text',
				},
			},
		},

		reset_password: {
			header: {
				heading: 'authentication.reset_password.header.heading',
				sub_heading: 'authentication.reset_password.header.sub_heading',
			},

			form: {
				password: {
					label: 'authentication.reset_password.form.password.label',
					place_holder: 'authentication.reset_password.form.password.place_holder',
					length: 'authentication.reset_password.form.password.length',
				},
				confirm_password: {
					label: 'authentication.reset_password.form.confirm_password.label',
					place_holder: 'authentication.reset_password.form.confirm_password.place_holder',
					required: 'authentication.reset_password.form.confirm_password.required',
					match: 'authentication.reset_password.form.confirm_password.match',
				},
				reset_password_button: {
					text: 'authentication.reset_password.form.reset_password_button.text',
				},
				back_to_login: {
					back_text: 'authentication.reset_password.form.back_to_login.back_text',
				},
			},
		},
	},

	org_dashboard: {
		status_card: {
			active_employees: {
				title: 'org_dashboard.status_card.active_employee.title',
			},

			active_positions: {
				title: 'org_dashboard.status_card.active_positions.title',
			},
			candidates: {
				title: 'org_dashboard.status_card.candidates.title',
			},
			active_assets: {
				title: 'org_dashboard.status_card.active_assets.title',
			},
		},
		events: {
			header: {
				heading: 'org_dashboard.events.header.heading',
				sub_heading: 'org_dashboard.events.header.sub_heading',
				jump_button: 'org_dashboard.events.header.jump_button',
			},
		},
		management: {
			employee_management: {
				header: {
					heading: 'org_dashboard.management.employee_management.header.heading',
					sub_heading: 'org_dashboard.management.employee_management.header.sub_heading',
					link: 'org_dashboard.management.employee_management.header.link',
				},
				table: {
					name: 'org_dashboard.management.employee_management.table.name',
					department: 'org_dashboard.management.employee_management.table.department',
					designation: 'org_dashboard.management.employee_management.table.designation',
				},
			},
			active_pipeline: {
				header: {
					heading: 'org_dashboard.management.active_pipeline.header.heading',
					sub_heading: 'org_dashboard.management.active_pipeline.header.sub_heading',
					link: 'org_dashboard.management.active_pipeline.header.link',
				},

				max_applicants: 'org_dashboard.management.active_pipeline.max_applicants',
				applicants: 'org_dashboard.management.active_pipeline.applicants',
				applicant: 'org_dashboard.management.active_pipeline.applicant',
			},
		},
	},

	search_modal: {
		tool_tip: {
			text: 'search_modal.tool_tip.text',
		},
		search_input: {
			place_holder: 'search_modal.search_input.place_holder',
		},

		employee_list: {
			title: 'search_modal.employee_list.title',
			link_text: 'search_modal.employee_list.link_text',
		},
		candidate_list: {
			title: 'search_modal.candidate_list.title',
			link_text: 'search_modal.candidate_list.link_text',
		},
		default_heading: {
			heading: 'search_modal.default_heading.heading',
		},
		view_button: {
			text: 'search_modal.view_button.text',
		},
	},

	policy: {
		breadcrumbs: {
			dashboard: {
				label: 'policy.breadcrumbs.dashboard.label',
			},
			documents: {
				label: 'policy.breadcrumbs.documents.label',
			},
			drafts: {
				label: 'policy.breadcrumbs.drafts.label',
			},
		},

		heading: {
			text: 'policy.heading.text',
		},

		add_btn: {
			text: 'policy.add_btn.text',
		},
		company_documents: {
			heading: {
				text: 'policy.company_documents.heading.text',
			},

			view_drafts_btn: {
				full_btn: 'policy.company_documents.view_drafts_btn.full_btn',
				short_btn: 'policy.company_documents.view_drafts_btn.short_btn',
			},
		},

		documents_record: {
			chart: {
				label: 'policy.documents_record.chart',
			},

			get_started: {
				heading: 'policy.document_record.get_started.heading',
				text: 'policy.document_record.get_started.text',
			},
			pending_drafts: {
				heading: 'policy.documents_record.pending_drafts.heading',
				heading_including: 'policy.documents_record.pending_drafts.heading_including',
				text: 'policy.documents_record.pending_drafts.text',
			},

			all_published: {
				heading: 'policy.document_record.all_published.heading',
				text: 'policy.document_record.all_published.text',
			},
		},
		policy_find: {
			template_sec: {
				heading: 'policy.policy_find.template_sec.heading',
				text: 'policy.policy_find.template_sec.text',
				browse_btn: 'policy.policy_find.template_sec.browse_btn',
			},
			need_help: {
				heading: 'policy.policy_find.need_help.heading',
				text: 'policy.policy_find.need_help.text',
				support_btn: 'policy.policy_find.need_help.support_btn',
			},
		},

		form: {
			add_document: {
				title: 'policy.form.add_document.title',
				document_title: {
					label: 'policy.form.add_document.document_title.label',
					place_holder: 'policy.form.add_document.document_title.place_holder',
					required: 'policy.form.add_document.document_title.required',
				},
				short_description: {
					label: 'policy.form.add_document.short_description.label',
					place_holder: 'policy.form.add_document.short_description.place_holder',
					required: 'policy.form.add_document.short_description.required',
				},
				document_category: {
					label: 'policy.form.add_document.document_category.label',
					place_holder: 'policy.form.add_document.document_category.place_holder',
					required: 'policy.form.add_document.document_category.required',
				},
				icon_select: {
					label: 'policy.form.add_document.icon_select.label',
					required: 'policy.form.add_document.icon_select.required',
				},
				content: {
					label: 'policy.form.add_document.content.label',
					required: 'policy.form.add_document.content.required',
				},
			},
		},

		button: {
			clear: 'policy.button.clear',
			delete: 'policy.button.delete ',
			draft: 'policy.button.draft',
			publish: 'policy.button.publish',
			edit: 'policy.button.edit',
		},

		draft_title: 'policy.draft_title',
		draft_pill: 'policy.draft_pill',
		last_updated: 'policy.last_updated',
	},

	upcoming_event: {
		title: 'upcoming_event.title',
		breadcrumbs: {
			dashboard: 'upcoming_event.breadcrumbs.dashboard',
			upcoming_events: 'upcoming_event.breadcrumbs.upcoming_events',
		},
		toolbar: {
			button: {
				text: 'upcoming_event.toolbar.button.text',
			},
		},

		events_widgets: {
			birthday: {
				title: 'upcoming_event.events_widgets.birthday.title',
			},
			holidays: {
				title: 'upcoming_event.events_widgets.holidays.title',
			},
			events: {
				title: 'upcoming_event.events_widgets.events.title',
			},
			misc: {
				title: 'upcoming_event.events_widgets.misc.title',
			},
		},

		add_event: {
			form: {
				title: {
					label: 'upcoming_event.add_event.form.title.label',
					place_holder: 'upcoming_event.add_event.form.title.place_holder',
				},
				description: {
					label: 'upcoming_event.add_event.form.description.label',
					place_holder: 'upcoming_event.add_event.form.description.place_holder',
				},
				all_day: {
					label: 'upcoming_event.add_event.form.all_day.label',
				},
				featured: {
					label: 'upcoming_event.add_event.form.featured.label',
				},
				category: {
					label: 'upcoming_events.add_event.form.category.label',
					placeholder: 'upcoming_events.add_event.form.category.placeholder',
				},
				start_date: {
					label: 'upcoming_event.add_event.form.start_date.label',
				},
				end_date: {
					label: 'upcoming_event.add_event.form.end_date.label',
				},
				clear_btn: {
					text: 'upcoming_event.add_event.form.clear_btn.text',
				},
				delete_btn: {
					text: 'upcoming_event.add_event.form.delete_btn.text',
				},
				cancel_btn: {
					text: 'upcoming_event.add_event.form.cancel_btn.text',
				},
				confirm_btn: {
					text: 'upcoming_event.add_event.form.confirm_btn.text',
				},
			},
		},

		view_event: {
			Category: 'upcoming_event.view_event.category',
			description: 'upcoming_event.view_event.description',
			start_date: 'upcoming_event.view_event.start_date',
			time_heading: 'upcoming_event.view_event.time_heading',
			end_date: 'upcoming_event.view_event.end_date',
		},
	},
}
