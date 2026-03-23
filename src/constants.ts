import { Book, Order, User } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 86000,
    oldPrice: 100000,
    genre: 'Kỹ năng',
    description: 'Cuốn sách nổi tiếng nhất thế giới về nghệ thuật giao tiếp và thu phục lòng người.',
    image: 'https://picsum.photos/seed/book1/400/600',
    rating: 4.8,
    reviews: 1250,
    isBestseller: true,
  },
  {
    id: '2',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 79000,
    oldPrice: 95000,
    genre: 'Văn học',
    description: 'Một hành trình tìm kiếm vận mệnh của chàng chăn cừu Santiago.',
    image: 'https://picsum.photos/seed/book2/400/600',
    rating: 4.7,
    reviews: 890,
    isBestseller: true,
  },
  {
    id: '3',
    title: 'Cha Giàu Cha Nghèo',
    author: 'Robert Kiyosaki',
    price: 120000,
    genre: 'Kinh tế',
    description: 'Những bài học về tài chính mà người giàu dạy con cái của họ.',
    image: 'https://picsum.photos/seed/book3/400/600',
    rating: 4.6,
    reviews: 560,
    isNew: true,
  },
  {
    id: '4',
    title: 'Hoàng Tử Bé',
    author: 'Antoine de Saint-Exupéry',
    price: 55000,
    genre: 'Thiếu nhi',
    description: 'Câu chuyện triết học sâu sắc dành cho cả trẻ em và người lớn.',
    image: 'https://picsum.photos/seed/book4/400/600',
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: '5',
    title: 'Súng, Vi Trùng và Thép',
    author: 'Jared Diamond',
    price: 250000,
    genre: 'Khoa học',
    description: 'Giải mã lịch sử loài người qua các yếu tố địa lý và môi trường.',
    image: 'https://picsum.photos/seed/book5/400/600',
    rating: 4.5,
    reviews: 320,
  },
  {
    id: '6',
    title: 'Lược Sử Thời Gian',
    author: 'Stephen Hawking',
    price: 180000,
    genre: 'Khoa học',
    description: 'Khám phá những bí ẩn của vũ trụ từ Big Bang đến lỗ đen.',
    image: 'https://picsum.photos/seed/book6/400/600',
    rating: 4.8,
    reviews: 780,
    isBestseller: true,
  },
];

export const GENRES = ['Tất cả', 'Kinh tế', 'Văn học', 'Kỹ năng', 'Thiếu nhi', 'Ngoại ngữ', 'Khoa học'];

export const ORDERS: Order[] = [
  { id: 'ORD001', customerName: 'Nguyễn Văn A', date: '2024-03-20', total: 250000, status: 'Completed' },
  { id: 'ORD002', customerName: 'Trần Thị B', date: '2024-03-21', total: 120000, status: 'Shipping' },
  { id: 'ORD003', customerName: 'Lê Văn C', date: '2024-03-22', total: 86000, status: 'Pending' },
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin EduHouse', email: 'admin@eduhouse.com', role: 'admin', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', name: 'Nguyễn Văn A', email: 'vana@gmail.com', role: 'customer', isHost: true, avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', name: 'Trần Thị B', email: 'thib@gmail.com', role: 'customer', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: '4', name: 'Lê Văn C', email: 'vanc@gmail.com', role: 'customer', isHost: true, avatar: 'https://picsum.photos/seed/user4/100/100' },
];
