import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		breakInfo: [ // dummy data. replace this with a proper req to supabase
            {
                "uuid": "488d9073-0403-4b9b-8175-d5c1cfe49566",
                "name": "Richard Stroud",
                "break": 54,
                "submitted": 1705099802000,
                "table": 2,
                "breakdown": [1, 5, 1, 6, 1, 7, 1, 5, 1, 4, 1, 7, 1, 7, 1, 7],
                "alumnus": true
                // implement reactions if really necessary; i think the whatsapp gc suffices
            },
            {
                "uuid": "f1278b27-3c49-48ae-8496-0875426a17cf",
                "name": "Rob Middleton",
                "break": 43,
                "submitted": 1705099802000,
                "table": 1,
                "breakdown": [1, 5, 1, 5, 1, 5, 1, 6, 1, 5, 1, 7, 1, 3],
                "alumnus": false
            },
            {
                "uuid": "f1278b27-3c49-48ae-8496-0875426a17cf",
                "name": "Rob Middleton",
                "break": 43,
                "submitted": 1705099802000,
                "table": 2,
                "breakdown": [1, 5, 1, 5, 1, 5, 1, 6, 1, 5, 1, 7, 1, 3],
                "alumnus": false
            },
            {
                "uuid": "f1278b27-3c49-48ae-8496-0875426a17cf",
                "name": "Rob Middleton",
                "break": 43,
                "submitted": 1705099802000,
                "table": 1,
                "breakdown": [1, 5, 1, 5, 1, 5, 1, 6, 1, 5, 1, 7, 1, 3],
                "alumnus": false
            },
            {
                "uuid": "488d9073-0403-4b9b-8175-d5c1cfe49566",
                "name": "Richard Stroud",
                "break": 42,
                "submitted": 1705099802000,
                "table": 2,
                "breakdown": [1, 5, 1, 6, 1, 7, 1, 5, 1, 4, 1, 7, 1, 2],
                "alumnus": true
            },
            {
                "uuid": "488d9073-0403-4b9b-8175-d5c1cfe49566",
                "name": "Richard Stroud",
                "break": 41,
                "submitted": 1705099802000,
                "table": 1,
                "breakdown": [1, 5, 1, 6, 1, 7, 1, 5, 1, 4, 1, 7, 1],
                "alumnus": true
            },
            {
                "uuid": "e21f8a6e-f25b-431f-b086-7caa825ebae2",
                "name": "Bowen Zhu",
                "break": 34,
                "submitted": 1708353412000,
                "table": 1,
                "breakdown": [1, 7, 1, 7, 1, 6, 1, 6, 1, 2, 1],
                "alumnus": false
            },
            {
                "uuid": "71296fde-924d-45c9-9a59-19db8a19a2f5",
                "name": "Om Goswamy",
                "break": 34,
                "submitted": 1708353412000,
                "table": 1,
                "breakdown": [1, 7, 1, 7, 1, 6, 1, 6, 1, 2, 1],
                "alumnus": false
            },
            {
                "uuid": "71296fde-924d-45c9-9a59-19db8a19a2f5",
                "name": "Om Goswamy",
                "break": 33,
                "submitted": 1708353412000,
                "table": 2,
                "breakdown": [1, 7, 1, 7, 1, 6, 1, 6, 1, 2],
                "alumnus": false
            },
            {
                "uuid": "599ed438-5a45-4495-b8a5-9000b9206df4",
                "name": "Kasidit Lauhabutr",
                "break": 32,
                "submitted": 1708353412000,
                "table": 1,
                "breakdown": [1, 7, 1, 7, 1, 6, 1, 7, 1],
                "alumnus": false
            },
        ]
	};
};