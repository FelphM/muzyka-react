import type { Post } from "../types/BlogPost";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";
import type { User } from "../types/User";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function getProducts(): Product[] {
  return ProductTable;
}

export function getPosts(): Post[] {
  return PostTable;
}

export function getCategories(): Category[] {
  return CategoryTable;
}

export function getUsers(): User[] {
  return UserTable;
}

export function addProduct(newProduct: Omit<Product, "id" | "slug">): Product {
  const id = Date.now().toString();
  const slug = generateSlug(newProduct.name);
  const product: Product = { ...newProduct, id, slug };
  ProductTable.push(product);
  return product;
}

export function addCategory(newCategory: Omit<Category, "id" | "productsCount" | "slug">): Category {
  const id = Date.now().toString();
  const slug = generateSlug(newCategory.name);
  const category: Category = { ...newCategory, id, productsCount: 0, slug };
  CategoryTable.push(category);
  return category;
}

export function addUser(newUser: Omit<User, "id" | "joinDate" | "lastLogin">): User {
  const id = Date.now().toString();
  const date = new Date().toISOString();
  const user: User = { ...newUser, id, joinDate: date, lastLogin: date };
  UserTable.push(user);
  return user;
}

export function updateProduct(updatedProduct: Product): Product | undefined {
  const index = ProductTable.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    ProductTable[index] = { ...updatedProduct, slug: generateSlug(updatedProduct.name) };
    return ProductTable[index];
  }
  return undefined;
}

export function deleteProduct(productId: string): boolean {
  const initialLength = ProductTable.length;
  ProductTable.splice(
    ProductTable.findIndex((p) => p.id === productId),
    1
  );
  return ProductTable.length < initialLength;
}

export function updateCategory(updatedCategory: Category): Category | undefined {
  const index = CategoryTable.findIndex((c) => c.id === updatedCategory.id);
  if (index !== -1) {
    CategoryTable[index] = { ...updatedCategory, slug: generateSlug(updatedCategory.name) };
    return CategoryTable[index];
  }
  return undefined;
}

export function deleteCategory(categoryId: string): boolean {
  const initialLength = CategoryTable.length;
  CategoryTable.splice(
    CategoryTable.findIndex((c) => c.id === categoryId),
    1
  );
  return CategoryTable.length < initialLength;
}

export function updateUser(updatedUser: User): User | undefined {
  const index = UserTable.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    UserTable[index] = updatedUser;
    return UserTable[index];
  }
  return undefined;
}

export function deleteUser(userId: string): boolean {
  const initialLength = UserTable.length;
  UserTable.splice(
    UserTable.findIndex((u) => u.id === userId),
    1
  );
  return UserTable.length < initialLength;
}

export const ProductTable: Product[] = [
  {
    id: "1",
    artist: "Queen",
    name: "Live At The Rainbow 1974",
    description:
      "Queen dazzled their audiences in 1974 with an unforgettable show at legendary London venue The Rainbow, delivered with a skill and confidence which belied their youth. The tape machines were rolling, capturing the highly electric performances. Now, to mark the 40th anniversary of these legendary shows, here, finally, is Queen: Live at the Rainbow ’74 - lovingly restored, edited, mixed and digitally mastered, and including much footage never previously seen",
    link: "https://www.discogs.com/master/729723-Queen-Live-At-The-Rainbow-74",
    price: 13,
    format: "Compact Disc",
    slug: "queen-rainbow",
    image: {
      src: "https://cdnx.jumpseller.com/allthetracks/image/47200543/R-29674024-1706887378-1832.jpg?1711980245",
      alt: "Queen Live At The Rainbow 1974 Cover",
    },
  },
  {
    id: "2",
    artist: "Pink Floyd",
    name: "The Dark Side Of The Moon",
    description:
      "El octavo álbum de estudio de Pink Floyd, conocido por su profundidad temática y experimentación sonora. Es uno de los álbumes más vendidos de todos los tiempos y una pieza fundamental del rock progresivo, especialmente buscado en formato de vinilo. Publicado originalmente en 1973.",
    link: "https://www.discogs.com/release/9287809-Pink-Floyd-The-Dark-Side-Of-The-Moon",
    price: 35, // Precio estimado para reedición o copia común
    format: "Long Play",
    slug: "pink-floyd-dark-side-moon",
    image: {
      src: "https://i.discogs.com/1fwskTLM6cfxbdNmBDJ8expl6wab0tEgxvuloLIqKh8/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTkyODc4/MDktMTQ3OTc1MzIz/Ni05NjE3LmpwZWc.jpeg",
      alt: "Pink Floyd The Dark Side Of The Moon Cover",
    },
  },
  {
    id: "3",
    artist: "Bruce Springsteen",
    name: "Nebraska",
    description:
      "Originalmente lanzado en 1982, 'Nebraska' es un álbum acústico, íntimo y oscuro de Bruce Springsteen, grabado en una grabadora de cuatro pistas. A menudo aparece en las listas de los más vendidos y coleccionados en Discogs, siendo una obra maestra folk rock.",
    link: "https://www.discogs.com/master/27690-Bruce-Springsteen-Nebraska",
    price: 20,
    format: "Long Play",
    slug: "bruce-springsteen-nebraska",
    image: {
      src: "https://i.discogs.com/2celtLBBPnII5ct1quV65j6_a2zv2xBKNqiYpN8wJRA/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NDk0/My0xMTg3OTg1NjUz/LmpwZWc.jpeg",
      alt: "Bruce Springsteen Nebraska Cover",
    },
  },
  {
    id: "4",
    artist: "Tracy Chapman",
    name: "Tracy Chapman",
    description:
      "El álbum debut homónimo de 1988, que incluye éxitos como 'Fast Car' y 'Talkin' 'bout a Revolution'. Un pilar del folk rock, es uno de los discos más coleccionados y vendidos en el mercado de Discogs.",
    link: "https://www.discogs.com/master/16285-Tracy-Chapman-Tracy-Chapman",
    price: 15,
    format: "Long Play",
    slug: "tracy-chapman-debut",
    image: {
      src: "https://i.discogs.com/urTNMzDHPA7NUlCqf4SDrEYhfTFOwFV9nlAU0-dxJ2U/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzODYy/OC0xMzY4MjE3MDg0/LTU4NjQuanBlZw.jpeg",
      alt: "Tracy Chapman Tracy Chapman Cover",
    },
  },
  {
    id: "5",
    artist: "The Velvet Underground & Nico",
    name: "The Velvet Underground & Nico",
    description:
      "Un influyente álbum de 1967, famoso por su arte de portada de Andy Warhol. Es considerado una obra maestra del rock experimental y a menudo se encuentra entre los discos más valiosos y buscados en Discogs, especialmente las primeras ediciones con la cáscara de plátano despegable.",
    link: "https://www.discogs.com/master/35276-The-Velvet-Underground-Nico-The-Velvet-Underground-Nico",
    price: 30,
    format: "Long Play",
    slug: "velvet-underground-nico",
    image: {
      src: "https://i.discogs.com/Yh1cs99h4P29lRCaXXfbWb7APlDM9ODuwphDfby_2T8/rs:fit/g:sm/q:90/h:587/w:600/czM6Ly9kaXNjb2dz/LWRhdGAbYXNlLWlt/YWdlcy9SLTUwMzQw/NDUtMTQ1NDU5Mzc2/OC04ODU2LmpwZWc.jpeg",
      alt: "The Velvet Underground & Nico Cover",
    },
  },
];

export const PostTable: Post[] = [
  {
    id: "mcr-comeback-2025",
    banner: {
      src: "https://eulaliemagazine.com/wp-content/uploads/2025/09/6D6F5AE8-D0A3-40EF-9294-8700CFFFA0A8.jpg",
      alt: "MCR Long Live To The Black Parade Tour Offical Photography",
    },
    card: {
      title: "MCR Comeback to the stages",
      author: "Alice",
      date: new Date("2025-07-09"),
      brief:
        "After three years away from the stages, Gerard and the rest of the band are back with The Black Parade Tour.",
    },
    post: {
      title: "MCR Comeback to the stages",
      content: [
        <p key="p1">
          After three years out of the stages, Gerard and the rest of the band
          have finally returned to give us the new The Black Parade Tour. Fans
          can expect classic hits alongside refreshed arrangements and a
          celebratory atmosphere as the band reconnects with audiences
          worldwide.
        </p>,
        <h3 key="h3-1">Tour Dates and Details</h3>,
        <ul key="ul-1">
          <li>Venue 1: Tokyo Dome - Sept 15</li>
          <li>Venue 2: London Stadium - Oct 1</li>
          <li>Venue 3: L.A. Forum - Nov 10</li>
        </ul>,
        <p key="p2">
          The band promises a fully immersive visual experience reminiscent of
          the original Black Parade era, with new costumes and stage production.
        </p>,
      ],
    },
  },
  {
    id: "taylor-swift-vinyl-record",
    banner: {
      src: "https://thedarkslide.com/cdn/shop/files/c0033546-_34421.jpg?v=1733299003",
      alt: "Close-up of Taylor Swift's Eras Tour vinyl record",
    },
    card: {
      title: "Taylor Swift Breaks Vinyl Sales Record",
      author: "Robert B.",
      date: new Date("2025-10-15"),
      brief:
        "Taylor Swift's latest album has officially broken the modern-day record for the most vinyl units sold in a single week in the US.",
    },
    post: {
      title: "The Swift Effect: Album Smashes Vinyl Sales Records",
      content: [
        <p key="p1">
          The singer-songwriter has once again demonstrated her massive commercial
          appeal, with her tenth studio album setting an all-time high for vinyl sales. 
          **Over 650,000 copies** of the album were sold in its debut week across various color variants and exclusive retailer editions.
        </p>,
        <p key="p2">
          This surge reflects a broader trend of vinyl revitalization, where pop
          artists are now driving the market that was once dominated by classic
          rock and indie bands. The success is attributed to extensive marketing and the **collectibility** of her physical media.
        </p>,
      ],
    },
  },
  {
    id: "radiohead-new-album-speculation",
    banner: {
      src: "https://imagenes.elpais.com/resizer/v2/53BVJ5SD7P3BOLTKLHMFXZQXVA.jpg?auth=4bed59e2418537cecfb8b9873b028c0477750a12e36926f64f911ad400a46f2b&width=414",
      alt: "RadioHead Band Photo",
    },
    card: {
      title: "Is Radiohead Releasing New Material?",
      author: "Jane D.",
      date: new Date("2025-10-20"),
      brief:
        "After a long hiatus, cryptic social media activity hints at a potential new Radiohead album or a special 20th-anniversary reissue.",
    },
    post: {
      title: "Cryptic Clues: The Wait for a New Radiohead LP",
      content: [
        <p key="p1">
          Fans have been dissecting recent changes to the band’s official website
          and social media accounts, which went dark before resurfacing with subtle, abstract images.
          This pattern mirrors previous album rollouts, suggesting that new material is imminent.
        </p>,
        <h4 key="h4-1">Anniversary Reissue or Brand New Album?</h4>,
        <p key="p2">
          While some speculate a new album, others believe the activity is related
          to a 20th-anniversary release of *Hail to the Thief*, possibly including
          previously unreleased B-sides and demos. **Official confirmation is expected next month.**
        </p>,
      ],
    },
  },
  {
    id: "kendrick-lamar-festival-headliner",
    banner: {
      src: "https://www.bendigoadvertiser.com.au/images/transform/v1/crop/frm/silverstone-feed-data/94aeb0db-4d3a-44d9-99f2-64aad55dca90.png/r0_0_3040_2026_w1200_h678_fmax.jpg",
      alt: "Kendrick Lamar performing on a dark stage",
    },
    card: {
      title: "Kendrick Lamar Confirmed to Headline Major Music Festivals",
      author: "Michael W.",
      date: new Date("2025-10-25"),
      brief:
        "The celebrated rapper is set to be the main act for three major European and North American music festivals in the 2026 season.",
    },
    post: {
      title: "King Kenny Reigns: The 2026 Festival Season Lineup",
      content: [
        <p key="p1">
          Kendrick Lamar, fresh off his latest Grammy wins, has been officially announced
          as the headlining artist for three of the world's most prominent music festivals:
          **Glastonbury, Primavera Sound, and Coachella**.
        </p>,
        <p key="p2">
          Tickets for all three events saw an immediate surge in demand following
          the announcement, proving the rapper's status as one of the most bankable
          live acts in modern music. Expect his sets to heavily feature tracks from his latest complex work.
        </p>,
      ],
    },
  },
];

export const CategoryTable: Category[] = [
  {
    id: "1",
    name: "Rock",
    description: "Classic Rock, Alternative Rock, Hard Rock, etc.",
    productsCount: 3,
    slug: "rock",
  },
  {
    id: "2",
    name: "Pop",
    description: "Pop, Synth-Pop, Dance-Pop, etc.",
    productsCount: 1,
    slug: "pop",
  },
  {
    id: "3",
    name: "Hip Hop",
    description: "Hip Hop, Rap, Trap, etc.",
    productsCount: 1,
    slug: "hip-hop",
  },
  {
    id: "4",
    name: "Electronic",
    description: "Electronic, House, Techno, Ambient, etc.",
    productsCount: 0,
    slug: "electronic",
  },
];

export const UserTable: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-01-01T10:00:00Z",
    lastLogin: "2023-11-20T15:30:00Z",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    status: "active",
    joinDate: "2023-02-15T11:00:00Z",
    lastLogin: "2023-11-19T14:00:00Z",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "customer",
    status: "inactive",
    joinDate: "2023-03-20T09:00:00Z",
    lastLogin: "2023-10-01T12:00:00Z",
  },
];

export const TABLES = {
  PRODUCT: {
    content: ProductTable,
  },
  POST: {
    content: PostTable
  },
  CATEGORY: {
    content: CategoryTable,
  },
  USER: {
    content: UserTable,
  },
};

