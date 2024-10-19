import { FaGraduationCap } from 'react-icons/fa';

// ARCHIVES FROM PROJECT
import avatarDefault from '../assets/icons/avatarDefault.svg';
import sashaAvatar from '../assets/woman-with-yellow-shirt.jpg';
import cosimaAvatar from '../assets/woman-with-yellow-shirt.jpg';
import lumityAvatar from '../assets/woman-with-yellow-shirt.jpg';
import sofiaAvatar from '../assets/woman-with-curly-hair-and-yellow-shirt.jpg';
import evelynAvatar from '../assets/woman-with-yellow-shirt.jpg';

import imageContent from '../assets/Explore.jpg';
import fakeAvatar from '../assets/white-guy-studing.jpg';

export const internalUser = {
    id: '01',
    name: 'João Victor',
    avatar: fakeAvatar,
    bios: 'Tenho 24 anos, sou formado na Unicid em engenharia e na USP em ciência da computação.',
    followers: [
        '02',
        '03'
    ],
    following: [
        '02',
        '03'
    ],
    arrCategorys: [
        'História',
        'Matemática',
        'Biologia'
    ]
}


export const reviews = [
    {
        id: '01',
        post_id: '02',
        user_id: '05',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    },
    {
        id: '02',
        post_id: '06',
        user_id: 'post',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    },
    {
        id: '03',
        post_id: '01',
        user_id: '08',
        actual_date: '01/11/2022',
        final_date: '09/02/2023',
        verified: false
    }
]

export const posts = [
    {
        id: '10',
        user_name: 'João Victor',
        user_id: '01',
        avatar: fakeAvatar,
        title: "Revolução Francesa",
        category: 'História',
        content: 'A Revolução Francesa, ciclo revolucionário que aconteceu entre 1789 e 1799, foi responsável pelo fim dos privilégios da aristocracia e pelo término do Antigo Regime. A Queda da Bastilha aconteceu em 14 de julho de 1789 e foi o marco que espalhou a revolução pela França.',
        img_content: null,
        likes: 3,
        coments: 2
    },
    {
        id: '11',
        user_name: 'Sasha',
        user_id: '02',
        avatar: sashaAvatar,
        title: 'Regra de 3',
        category: 'Matemática',
        content: '1º passo – Identificar as grandezas e construção da tabela. 2º passo – Analisar se as grandezas são diretamente ou inversamente proporcionais. 3º passo – Aplicar o método de resolução correto para cada um dos casos, e, por fim, resolver a equação.        ',
        img_content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjT5Xc24P2iXFN8W0hUvi1BXBooGKz3p86OBE0yiOTg&s',
        likes: 2,
        coments: 1,
    },
    {
        id: '12',
        user_name: 'Lumity',
        user_id: '04',
        avatar: lumityAvatar,
        content: 'Otímo post, mas poderia descrever mais os passo a passo de como realizar um exemplo de regra de 3',
        postFather: '11'
    },
    {
        id: '10',
        user_name: 'Sasha',
        user_id: '02',
        avatar: sashaAvatar,
        content: 'O antigo regima, apenas para complementar, era um sistema monárquico, além de que após isso, a burguesia se tornou um meio de ',
        postFather: '10'
    },
    {
        id: '10',
        user_name: 'Lumity',
        user_id: '04',
        avatar: lumityAvatar,
        content: 'Otímo post, mas poderia descrever mais os passo a passo de como realizar um exemplo de regra de 3',
        postFather: '11'
    },
    {
        postId: '01',
        user_id: '05',
        user_name: 'João Victor',
        user_vatar: imageContent,
        category: 'Química',
        title: 'Ligações Covalentes',
        post_archive: imageContent,
        description: 'A Ligação Covalente ou Ligação Molecular, são ligações químicas em que há o compartilhamento de um ou mais pares de elétrons entre os átomos, com a finalidade de formar moléculas estáveis, que segundo a Teoria do Octeto: "um átomo adquire estabilidade quando possui 8 elétrons na camada de valência (camada eletrônica mais externa), ou 2 elétrons quando possui apenas uma camada" '
    },
    {
        postId: '02',
        user_id: '06',
        user_name: 'Giovanna',
        user_vatar: imageContent,
        category: 'História',
        title: 'Golpe de 64',
        post_archive: '',
        description: 'A Ditadura é o período em que o país foi governado pelos militares e que teve início a partir do famoso “Golpe de 64”, ou seja, um golpe de estado que tirou o então presidente João Goulart (mais conhecido como Jango) do poder e colocou em seu lugar o General Castello Branco. É comum ouvirmos falar em “Revolução de 64”, mas o nome mais correto para o que aconteceu é “golpe”, porque normalmente a revolução parte da população, o que não foi o caso.'
    },
    {
        postId: '03',
        user_id: '07',
        user_name: 'Márcia',
        user_vatar: imageContent,
        category: 'Sociologia',
        title: 'Fatos Sociais de Émile Durkheim',
        post_archive: '',
        description: 'Os fatos sociais são conjuntos de hábitos praticados pelas pessoas, por meio de suas ações, que permitem a identificação de uma consciência coletiva, a qual age por trás dos indivíduos, influenciando as suas ações de alguma maneira.'
    },
    {
        postId: '04',
        user_id: '08',
        user_name: 'Fernanda',
        user_vatar: imageContent,
        category: 'Português',
        post_archive: imageContent,
        description: 'A Microsoft e nossos fornecedores terceirizados usam cookies para armazenar e acessar informações tais como IDs exclusivas para fornecer, manter e melhorar nossos serviços e anúncios. Se você concordar, o MSN e o Microsoft Bing personalizarão o conteúdo e os anúncios que você vê. Você pode selecionar Aceito para consentir com esses usos ou clicar em Gerenciar preferências para revisar suas opções e exercer seu direito de se opor ao Interesse Legítimo quando usado. Você pode alterar sua seleção em Gerenciar Preferências na parte inferior desta página.Declaração de Privacidade'
    },
    {
        postId: '05',
        uid: '01',
        name: 'sasha',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        title: 'post da sasha 01',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'Matemática',
        likes: 10
    },
    {
        postId: '06',
        uid: '02',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        name: 'sasha',
        title: 'post da sasha 02',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'História',
        likes: 5
    },
    {
        postId: '07',
        uid: '04',
        userPhoto: sashaAvatar,
        imgContent: 'https://gastronomixsprod.blob.core.windows.net/production/Blog%20omslagen/22.%20Schol.jpg',
        name: 'sasha',
        title: 'post da sasha 03',
        content: 'Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures. No attribution required.',
        category: 'Sociologia',
        likes: 15
    },
]

export const users = [
    {
        'id': '01',
        'name': 'Sarah',
        'avatar': sashaAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '02',
            '04'
        ],
        following: [
            '06',
            '03',
            '02'
        ]
    },
    {
        'id': '02',
        'name': 'sasha bazanea',
        'avatar': sashaAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '01',
            '03'
        ],
        following: [
            '01',
            '03',
            '04'
        ]
    },
    {
        'id': '03',
        'name': 'cosima',
        'avatar': cosimaAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '01',
            '02'
        ],
        following: [
            '02',
        ]
    },
    {
        'id': '04',
        'name': 'lumity blait',
        'avatar': lumityAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '02'
        ],
        following: [
            '01',
        ]
    },
    {
        'id': '05',
        'name': 'sofia manfano',
        'avatar': sofiaAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '06'
        ],
        following: [
            '06',
        ]
    },
    {
        'id': '06',
        'name': 'evelyn hugo',
        'avatar': evelynAvatar,
        'bios': 'i hate men and love woman',
        followers: [
            '01',
            '05'
        ],
        following: [
            '05',
        ]
    }
]
