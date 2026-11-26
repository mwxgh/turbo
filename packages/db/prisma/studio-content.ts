/**
 * Starter content of Studio (docs/product/studio.md), written for this project. The seed adds a
 * track or roadmap only when its slug is missing, so edits made in the admin area are kept.
 * Code fences use `~~~` so the Markdown fits in template literals.
 */

type Category = 'LANGUAGE' | 'FRAMEWORK' | 'PATTERN' | 'FUNDAMENTAL' | 'TOOL'

interface SeedQuestion {
  prompt: string
  choices: string[]
  answer: number
  explanation: string
}

interface SeedLesson {
  slug: string
  title: string
  summary: string
  minutes: number
  content: string
  questions: SeedQuestion[]
}

export interface SeedTrack {
  slug: string
  category: Category
  title: string
  summary: string
  lessons: SeedLesson[]
}

export interface SeedRoadmap {
  slug: string
  title: string
  summary: string
  steps: { title: string; description: string; track?: string }[]
}

export const STUDIO_TRACKS: SeedTrack[] = [
  // ─── Languages ───────────────────────────────────────────────────────────────────────────────
  {
    slug: 'javascript',
    category: 'LANGUAGE',
    title: 'JavaScript',
    summary:
      'Ngôn ngữ của trình duyệt và Node.js: biến, hàm, đối tượng, bất đồng bộ.',
    lessons: [
      {
        slug: 'bien-va-kieu',
        title: 'Biến và kiểu dữ liệu',
        summary: 'let, const, các kiểu nguyên thuỷ và so sánh bằng ===.',
        minutes: 10,
        content: `## Khai báo biến

- \`const\`: không gán lại được. Dùng mặc định.
- \`let\`: gán lại được, phạm vi trong khối \`{ }\`.
- \`var\`: phạm vi theo hàm, dễ gây lỗi. Code mới không dùng.

~~~js
const name = 'Lan'
let count = 0
count += 1
~~~

\`const\` chỉ khoá **biến**, không khoá giá trị bên trong: \`const list = []\` rồi \`list.push(1)\` vẫn chạy.

## Kiểu nguyên thuỷ

\`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`bigint\`, \`symbol\`. Mọi thứ khác là \`object\` (mảng, hàm, đối tượng).

~~~js
typeof 'hi'      // 'string'
typeof 42        // 'number'
typeof null      // 'object' (lỗi lịch sử của ngôn ngữ)
Array.isArray([]) // true
~~~

## So sánh

\`==\` tự đổi kiểu trước khi so sánh (\`'1' == 1\` là \`true\`). Luôn dùng \`===\` để so sánh cả kiểu lẫn giá trị.`,
        questions: [
          {
            prompt:
              'Cách khai báo nào nên dùng mặc định cho biến không gán lại?',
            choices: ['var', 'let', 'const'],
            answer: 2,
            explanation:
              'const ngăn gán lại biến, giúp code dễ đọc và tránh lỗi vô tình gán đè.',
          },
          {
            prompt: "Kết quả của '1' === 1 là gì?",
            choices: ['true', 'false', 'Lỗi'],
            answer: 1,
            explanation:
              '=== so sánh cả kiểu: string khác number nên là false.',
          },
          {
            prompt: 'typeof null trả về gì?',
            choices: ["'null'", "'undefined'", "'object'"],
            answer: 2,
            explanation:
              "Đây là lỗi lịch sử của JavaScript: typeof null là 'object'.",
          },
        ],
      },
      {
        slug: 'bat-dong-bo',
        title: 'Bất đồng bộ: Promise và async/await',
        summary: 'Chờ kết quả mạng hoặc file mà không chặn luồng chính.',
        minutes: 15,
        content: `## Vì sao cần bất đồng bộ

JavaScript chạy một luồng. Gọi API hay đọc file mất thời gian; nếu chờ kiểu đồng bộ, giao diện sẽ đứng. Thay vào đó, hàm trả về một **Promise**: lời hứa sẽ có kết quả sau.

## async / await

~~~js
async function loadUser(id) {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json()
}
~~~

- Hàm \`async\` luôn trả về Promise.
- \`await\` tạm dừng **hàm đó** (không dừng cả chương trình) tới khi Promise xong.
- Lỗi bắt bằng \`try / catch\` như code thường.

## Chạy song song

~~~js
// Tuần tự: tổng thời gian = a + b
const a = await getA()
const b = await getB()

// Song song: tổng thời gian ≈ max(a, b)
const [a2, b2] = await Promise.all([getA(), getB()])
~~~

Dùng \`Promise.all\` khi các việc không phụ thuộc nhau.`,
        questions: [
          {
            prompt: 'Một hàm khai báo async luôn trả về gì?',
            choices: ['Giá trị thường', 'Một Promise', 'undefined'],
            answer: 1,
            explanation:
              'Giá trị return của hàm async được bọc trong một Promise.',
          },
          {
            prompt: 'await dừng cái gì?',
            choices: [
              'Cả chương trình',
              'Chỉ hàm async đang chạy',
              'Trình duyệt',
            ],
            answer: 1,
            explanation:
              'Chỉ hàm async hiện tại chờ; luồng chính vẫn xử lý việc khác.',
          },
          {
            prompt: 'Hai request không phụ thuộc nhau nên chạy thế nào?',
            choices: [
              'await lần lượt từng cái',
              'Promise.all([...])',
              'Dùng setTimeout',
            ],
            answer: 1,
            explanation:
              'Promise.all chạy song song, tổng thời gian gần bằng request lâu nhất.',
          },
        ],
      },
    ],
  },
  {
    slug: 'typescript',
    category: 'LANGUAGE',
    title: 'TypeScript',
    summary: 'JavaScript có kiểu tĩnh: bắt lỗi khi viết code thay vì khi chạy.',
    lessons: [
      {
        slug: 'kieu-co-ban',
        title: 'Kiểu cơ bản, interface và union',
        summary: 'Mô tả hình dạng dữ liệu để trình biên dịch kiểm tra giúp.',
        minutes: 12,
        content: `## Chú thích kiểu

~~~ts
let age: number = 30
const tags: string[] = ['ts', 'web']

function greet(name: string): string {
  return \`Xin chào \${name}\`
}
~~~

Thường không cần ghi kiểu cho biến: TypeScript **tự suy luận** từ giá trị. Nên ghi kiểu ở tham số hàm và ranh giới API.

## interface và type

~~~ts
interface User {
  id: string
  name: string
  email?: string // không bắt buộc
}

type Status = 'draft' | 'published' // union của các chuỗi cụ thể
~~~

## Thu hẹp kiểu (narrowing)

~~~ts
function label(value: string | number) {
  if (typeof value === 'number') return value.toFixed(2)
  return value.toUpperCase() // ở đây value chắc chắn là string
}
~~~

Kiểu chỉ tồn tại lúc biên dịch; khi chạy, code vẫn là JavaScript.`,
        questions: [
          {
            prompt: 'Dấu ? trong email?: string nghĩa là gì?',
            choices: [
              'email có thể null',
              'email không bắt buộc',
              'email là chuỗi rỗng',
            ],
            answer: 1,
            explanation: 'Thuộc tính tuỳ chọn: có thể không có (undefined).',
          },
          {
            prompt: "type Status = 'draft' | 'published' là gì?",
            choices: ['Enum', 'Union type', 'Interface'],
            answer: 1,
            explanation:
              'Union của các literal type: chỉ nhận đúng một trong các giá trị đó.',
          },
          {
            prompt: 'Kiểu TypeScript có tồn tại khi code chạy không?',
            choices: ['Có', 'Không, bị xoá khi biên dịch', 'Chỉ trên Node.js'],
            answer: 1,
            explanation: 'Kiểu chỉ dùng để kiểm tra lúc biên dịch, rồi bị xoá.',
          },
        ],
      },
      {
        slug: 'generics',
        title: 'Generics',
        summary: 'Viết hàm và kiểu dùng lại được cho nhiều kiểu dữ liệu.',
        minutes: 12,
        content: `## Vấn đề

Hàm lấy phần tử đầu của mảng: nếu khai báo \`any[]\` thì mất thông tin kiểu.

~~~ts
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const n = first([1, 2, 3])     // number | undefined
const s = first(['a', 'b'])    // string | undefined
~~~

\`T\` là **tham số kiểu**: TypeScript tự suy ra từ đối số.

## Ràng buộc

~~~ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
longest('abc', 'de')   // ok
longest([1], [1, 2])   // ok
~~~

## Kiểu generic

~~~ts
interface Page<T> {
  items: T[]
  total: number
}
type UserPage = Page<User>
~~~`,
        questions: [
          {
            prompt: 'Trong function first<T>(items: T[]), T là gì?',
            choices: ['Một biến', 'Tham số kiểu', 'Một class'],
            answer: 1,
            explanation:
              'T là tham số kiểu, được thay bằng kiểu thật khi gọi hàm.',
          },
          {
            prompt: 'T extends { length: number } có tác dụng gì?',
            choices: [
              'T phải có thuộc tính length kiểu number',
              'T kế thừa class Array',
              'T luôn là string',
            ],
            answer: 0,
            explanation:
              'Ràng buộc: chỉ nhận kiểu có length, nên dùng được a.length.',
          },
          {
            prompt: 'Vì sao generics tốt hơn any?',
            choices: [
              'Chạy nhanh hơn',
              'Giữ được thông tin kiểu',
              'Viết ngắn hơn',
            ],
            answer: 1,
            explanation:
              'any tắt kiểm tra kiểu; generics giữ kiểu của dữ liệu đi qua hàm.',
          },
        ],
      },
    ],
  },
  {
    slug: 'python',
    category: 'LANGUAGE',
    title: 'Python',
    summary: 'Cú pháp gọn, mạnh về dữ liệu, script và backend.',
    lessons: [
      {
        slug: 'co-ban',
        title: 'Cú pháp cơ bản',
        summary: 'Thụt lề, list, dict và vòng lặp.',
        minutes: 10,
        content: `## Thụt lề là cú pháp

Python dùng thụt lề (thường 4 dấu cách) thay cho \`{ }\`.

~~~python
def grade(score: int) -> str:
    if score >= 8:
        return "Giỏi"
    elif score >= 5:
        return "Đạt"
    return "Chưa đạt"
~~~

## list và dict

~~~python
langs = ["python", "go", "ts"]
langs.append("rust")

user = {"name": "Lan", "age": 20}
print(user["name"])
print(user.get("email", "chưa có"))
~~~

## List comprehension

~~~python
squares = [n * n for n in range(5)]          # [0, 1, 4, 9, 16]
evens = [n for n in range(10) if n % 2 == 0]
~~~`,
        questions: [
          {
            prompt: 'Python đánh dấu khối lệnh bằng gì?',
            choices: ['Dấu { }', 'Thụt lề', 'Từ khoá end'],
            answer: 1,
            explanation: 'Thụt lề là một phần của cú pháp Python.',
          },
          {
            prompt:
              "user.get('email', 'chưa có') trả về gì khi không có key email?",
            choices: ['Lỗi KeyError', 'None', "'chưa có'"],
            answer: 2,
            explanation:
              'get trả về giá trị mặc định khi không có key, không ném lỗi.',
          },
          {
            prompt: '[n * n for n in range(3)] cho kết quả nào?',
            choices: ['[1, 4, 9]', '[0, 1, 4]', '[0, 1, 2]'],
            answer: 1,
            explanation: 'range(3) là 0, 1, 2; bình phương là 0, 1, 4.',
          },
        ],
      },
      {
        slug: 'ham-va-module',
        title: 'Hàm, module và môi trường ảo',
        summary:
          'Tổ chức code thành module và cài thư viện riêng cho từng project.',
        minutes: 10,
        content: `## Hàm với tham số mặc định và keyword

~~~python
def connect(host: str, port: int = 5432, *, ssl: bool = False):
    ...

connect("db.local", ssl=True)
~~~

Tham số sau \`*\` phải truyền bằng tên: lời gọi rõ nghĩa hơn.

## Module

Mỗi file \`.py\` là một module.

~~~python
# utils.py
def slugify(text: str) -> str:
    return text.lower().replace(" ", "-")

# main.py
from utils import slugify
~~~

## Môi trường ảo

Mỗi project nên có thư viện riêng để không xung đột phiên bản:

~~~bash
python -m venv .venv
source .venv/bin/activate
pip install requests
pip freeze > requirements.txt
~~~`,
        questions: [
          {
            prompt:
              'Tham số đứng sau * trong định nghĩa hàm phải truyền thế nào?',
            choices: ['Theo vị trí', 'Theo tên', 'Không truyền được'],
            answer: 1,
            explanation: 'Đó là keyword-only argument.',
          },
          {
            prompt: 'Môi trường ảo (venv) giải quyết vấn đề gì?',
            choices: [
              'Chạy Python nhanh hơn',
              'Tách thư viện của từng project',
              'Biên dịch Python ra mã máy',
            ],
            answer: 1,
            explanation:
              'Mỗi project có bộ thư viện và phiên bản riêng, không đụng nhau.',
          },
          {
            prompt: 'Trong Python, một module là gì?',
            choices: ['Một file .py', 'Một class', 'Một thư mục bất kỳ'],
            answer: 0,
            explanation: 'Mỗi file .py là một module, import được.',
          },
        ],
      },
    ],
  },
  {
    slug: 'go',
    category: 'LANGUAGE',
    title: 'Go',
    summary: 'Ngôn ngữ biên dịch, đơn giản, mạnh về xử lý đồng thời.',
    lessons: [
      {
        slug: 'co-ban',
        title: 'Cú pháp và xử lý lỗi',
        summary: 'Hàm trả nhiều giá trị, lỗi là giá trị.',
        minutes: 12,
        content: `## Chương trình đầu tiên

~~~go
package main

import "fmt"

func main() {
    name := "Go"          // khai báo ngắn, tự suy kiểu
    fmt.Println("Xin chào", name)
}
~~~

## Lỗi là giá trị

Go không có exception. Hàm trả về thêm một giá trị \`error\`:

~~~go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("chia cho 0")
    }
    return a / b, nil
}

result, err := divide(10, 0)
if err != nil {
    log.Fatal(err)
}
~~~

Kiểm tra \`err != nil\` ngay sau mỗi lời gọi có thể lỗi.`,
        questions: [
          {
            prompt: 'Go báo lỗi bằng cách nào?',
            choices: ['throw / catch', 'Trả về giá trị error', 'In ra console'],
            answer: 1,
            explanation: 'Lỗi là một giá trị trả về, thường là giá trị cuối.',
          },
          {
            prompt: 'name := "Go" làm gì?',
            choices: [
              'So sánh name với "Go"',
              'Khai báo và gán, tự suy kiểu',
              'Khai báo hằng',
            ],
            answer: 1,
            explanation: ':= là khai báo ngắn trong hàm.',
          },
          {
            prompt: 'Giá trị "không có lỗi" của error là gì?',
            choices: ['0', 'false', 'nil'],
            answer: 2,
            explanation: 'err == nil nghĩa là không có lỗi.',
          },
        ],
      },
      {
        slug: 'goroutine-channel',
        title: 'Goroutine và channel',
        summary: 'Chạy song song nhẹ nhàng và truyền dữ liệu an toàn.',
        minutes: 15,
        content: `## Goroutine

Thêm \`go\` trước lời gọi hàm để chạy nó đồng thời. Goroutine rất nhẹ, có thể tạo hàng nghìn cái.

~~~go
go sendEmail(user)
~~~

## Channel

Channel là đường ống để goroutine gửi dữ liệu cho nhau.

~~~go
results := make(chan int)

for _, n := range []int{1, 2, 3} {
    go func(n int) { results <- n * n }(n)
}

sum := 0
for i := 0; i < 3; i++ {
    sum += <-results // nhận, chờ tới khi có dữ liệu
}
~~~

## WaitGroup

Khi chỉ cần chờ các goroutine xong:

~~~go
var wg sync.WaitGroup
for _, url := range urls {
    wg.Add(1)
    go func(u string) {
        defer wg.Done()
        fetch(u)
    }(url)
}
wg.Wait()
~~~

Nguyên tắc của Go: chia sẻ dữ liệu bằng cách truyền qua channel, thay vì nhiều goroutine cùng sửa một biến.`,
        questions: [
          {
            prompt: 'Từ khoá nào chạy một hàm trong goroutine mới?',
            choices: ['async', 'go', 'thread'],
            answer: 1,
            explanation: 'go f() chạy f đồng thời trong một goroutine.',
          },
          {
            prompt: '<-results làm gì?',
            choices: [
              'Gửi vào channel',
              'Nhận từ channel, chờ nếu chưa có',
              'Đóng channel',
            ],
            answer: 1,
            explanation: 'Mũi tên ra khỏi channel là nhận dữ liệu.',
          },
          {
            prompt: 'sync.WaitGroup dùng để làm gì?',
            choices: [
              'Chờ một nhóm goroutine chạy xong',
              'Khoá một biến',
              'Hẹn giờ',
            ],
            answer: 0,
            explanation: 'Add, Done và Wait đếm số goroutine còn chạy.',
          },
        ],
      },
    ],
  },

  // ─── Frameworks ──────────────────────────────────────────────────────────────────────────────
  {
    slug: 'react',
    category: 'FRAMEWORK',
    title: 'React',
    summary: 'Thư viện xây giao diện bằng component và state.',
    lessons: [
      {
        slug: 'component-props',
        title: 'Component và props',
        summary: 'Chia giao diện thành các mảnh nhỏ dùng lại được.',
        minutes: 12,
        content: `## Component là một hàm

~~~tsx
function Greeting({ name }: { name: string }) {
  return <h1>Xin chào {name}</h1>
}

export function App() {
  return (
    <main>
      <Greeting name="Lan" />
      <Greeting name="Minh" />
    </main>
  )
}
~~~

- Tên component viết hoa chữ đầu.
- **props** là dữ liệu cha truyền xuống; component con không được sửa props.
- JSX trong \`{ }\` là biểu thức JavaScript.

## Danh sách cần key

~~~tsx
<ul>
  {users.map((u) => (
    <li key={u.id}>{u.name}</li>
  ))}
</ul>
~~~

\`key\` giúp React biết phần tử nào thêm, xoá hay đổi chỗ. Dùng id ổn định, tránh dùng chỉ số mảng khi danh sách có thể đổi thứ tự.`,
        questions: [
          {
            prompt: 'Component con có được sửa props của nó không?',
            choices: ['Có', 'Không', 'Chỉ khi dùng class'],
            answer: 1,
            explanation:
              'Props là chỉ đọc; muốn đổi thì cha truyền giá trị mới.',
          },
          {
            prompt: 'Vì sao cần key khi render danh sách?',
            choices: [
              'Để CSS đẹp hơn',
              'Để React nhận ra từng phần tử giữa các lần render',
              'Bắt buộc của HTML',
            ],
            answer: 1,
            explanation:
              'key ổn định giúp React cập nhật đúng phần tử, giữ đúng state.',
          },
          {
            prompt: 'Tên component React phải thế nào?',
            choices: ['Viết thường', 'Viết hoa chữ đầu', 'Có tiền tố use'],
            answer: 1,
            explanation:
              'JSX coi tên viết thường là thẻ HTML, viết hoa là component.',
          },
        ],
      },
      {
        slug: 'state-effect',
        title: 'State và effect',
        summary:
          'useState để lưu dữ liệu thay đổi, useEffect để đồng bộ với bên ngoài.',
        minutes: 15,
        content: `## useState

~~~tsx
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Đã bấm {count} lần
    </button>
  )
}
~~~

Gọi \`setCount\` làm component render lại với giá trị mới. Khi giá trị mới dựa trên giá trị cũ, truyền hàm \`(c) => c + 1\`.

## useEffect

Dùng để **đồng bộ với hệ thống bên ngoài** (timer, subscription, DOM thủ công):

~~~tsx
useEffect(() => {
  const id = setInterval(() => setNow(new Date()), 1000)
  return () => clearInterval(id) // dọn dẹp
}, [])
~~~

- Mảng phụ thuộc \`[]\`: chạy sau lần render đầu.
- Hàm trả về là bước dọn dẹp, chạy trước lần effect sau hoặc khi component bị gỡ.

Đừng dùng effect để tính dữ liệu suy ra từ props/state: tính thẳng trong lúc render.`,
        questions: [
          {
            prompt: 'Gọi hàm set của useState gây ra điều gì?',
            choices: ['Không có gì', 'Component render lại', 'Trang tải lại'],
            answer: 1,
            explanation: 'State đổi thì React render lại component đó.',
          },
          {
            prompt: 'Hàm trả về trong useEffect dùng để làm gì?',
            choices: ['Trả dữ liệu', 'Dọn dẹp', 'Bắt lỗi'],
            answer: 1,
            explanation:
              'Cleanup: huỷ timer, bỏ subscription trước khi chạy lại hoặc gỡ component.',
          },
          {
            prompt: 'Giá trị fullName = first + " " + last nên tính ở đâu?',
            choices: [
              'Trong useEffect rồi setState',
              'Tính thẳng khi render',
              'Trong localStorage',
            ],
            answer: 1,
            explanation:
              'Dữ liệu suy ra được thì tính khi render, không cần state hay effect.',
          },
        ],
      },
    ],
  },
  {
    slug: 'nextjs',
    category: 'FRAMEWORK',
    title: 'Next.js',
    summary: 'Framework React: định tuyến theo thư mục, render trên server.',
    lessons: [
      {
        slug: 'app-router',
        title: 'App Router: định tuyến theo thư mục',
        summary: 'page.tsx, layout.tsx và route động.',
        minutes: 12,
        content: `## Mỗi thư mục là một đoạn URL

~~~
app/
  layout.tsx          → khung chung của mọi trang
  page.tsx            → /
  blog/
    page.tsx          → /blog
    [slug]/
      page.tsx        → /blog/xin-chao
~~~

- \`page.tsx\`: nội dung của URL đó.
- \`layout.tsx\`: bọc các trang con, giữ nguyên khi chuyển trang.
- \`[slug]\`: đoạn động, đọc qua \`params\`.

~~~tsx
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article>{post.title}</article>
}
~~~

Thư mục trong ngoặc như \`(auth)\` chỉ để nhóm file, không thành đoạn URL.`,
        questions: [
          {
            prompt: 'File nào định nghĩa nội dung của URL /blog?',
            choices: [
              'app/blog.tsx',
              'app/blog/page.tsx',
              'pages/blog/index.html',
            ],
            answer: 1,
            explanation:
              'Trong App Router, page.tsx trong thư mục blog là /blog.',
          },
          {
            prompt: 'Thư mục (auth) ảnh hưởng URL thế nào?',
            choices: ['Thêm /auth', 'Không ảnh hưởng', 'Bắt buộc đăng nhập'],
            answer: 1,
            explanation: 'Route group chỉ để tổ chức file.',
          },
          {
            prompt: 'layout.tsx khác page.tsx ở điểm nào?',
            choices: [
              'Layout bọc các trang con và giữ nguyên khi chuyển trang',
              'Layout chỉ chạy trên client',
              'Không khác',
            ],
            answer: 0,
            explanation: 'Layout dùng chung cho các route con.',
          },
        ],
      },
      {
        slug: 'server-client',
        title: 'Server Component và Client Component',
        summary: 'Chọn nơi render để trang nhanh và bảo mật.',
        minutes: 12,
        content: `## Mặc định là Server Component

Component trong \`app/\` chạy trên server: đọc DB, gọi API bằng secret, không gửi JavaScript của nó xuống trình duyệt.

~~~tsx
// Server Component
export default async function Page() {
  const products = await db.product.findMany()
  return <ProductList products={products} />
}
~~~

## Khi nào cần 'use client'

Khi component cần **tương tác**: \`useState\`, \`useEffect\`, sự kiện \`onClick\`, API của trình duyệt.

~~~tsx
'use client'

export function LikeButton() {
  const [liked, setLiked] = useState(false)
  return <button onClick={() => setLiked(!liked)}>{liked ? '♥' : '♡'}</button>
}
~~~

Đặt \`'use client'\` ở component lá nhỏ nhất có thể, phần còn lại để trên server.`,
        questions: [
          {
            prompt: 'Component trong app/ mặc định chạy ở đâu?',
            choices: ['Trình duyệt', 'Server', 'Cả hai luôn luôn'],
            answer: 1,
            explanation: 'Mặc định là Server Component.',
          },
          {
            prompt: 'Component dùng useState cần gì?',
            choices: [
              "'use client' ở đầu file",
              "'use server'",
              'Không cần gì',
            ],
            answer: 0,
            explanation: 'Hook state chỉ chạy được trong Client Component.',
          },
          {
            prompt: "Nên đặt 'use client' ở đâu?",
            choices: [
              'Ở layout gốc',
              'Ở component lá nhỏ nhất cần tương tác',
              'Ở mọi file',
            ],
            answer: 1,
            explanation:
              'Giữ càng nhiều code trên server càng ít JavaScript gửi xuống.',
          },
        ],
      },
    ],
  },
  {
    slug: 'nestjs',
    category: 'FRAMEWORK',
    title: 'NestJS',
    summary: 'Framework backend Node.js theo module, có dependency injection.',
    lessons: [
      {
        slug: 'module-controller-service',
        title: 'Module, controller và service',
        summary: 'Ba khối chính của một ứng dụng Nest.',
        minutes: 12,
        content: `## Controller nhận request

~~~ts
@Controller('cats')
export class CatsController {
  constructor(private readonly cats: CatsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cats.findOne(id)
  }
}
~~~

## Service chứa nghiệp vụ

~~~ts
@Injectable()
export class CatsService {
  findOne(id: string) {
    /* đọc DB, kiểm tra quyền… */
  }
}
~~~

## Module gom chúng lại

~~~ts
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
~~~

Nest tự tạo \`CatsService\` và **tiêm** vào constructor của controller (dependency injection). Controller mỏng, nghiệp vụ nằm trong service để dễ test.`,
        questions: [
          {
            prompt: 'Nghiệp vụ nên đặt ở đâu trong Nest?',
            choices: ['Controller', 'Service', 'main.ts'],
            answer: 1,
            explanation: 'Controller chỉ nhận request và gọi service.',
          },
          {
            prompt: 'Ai tạo instance CatsService cho controller?',
            choices: ['Ta tự new', 'Nest, qua dependency injection', 'Node.js'],
            answer: 1,
            explanation: 'Service khai báo trong providers được Nest tiêm vào.',
          },
          {
            prompt: '@Get(":id") kết hợp @Controller("cats") xử lý URL nào?',
            choices: ['GET /:id', 'GET /cats/:id', 'POST /cats'],
            answer: 1,
            explanation: 'Đường của controller ghép với đường của method.',
          },
        ],
      },
      {
        slug: 'dto-validation',
        title: 'DTO và kiểm tra dữ liệu',
        summary: 'Không tin dữ liệu từ client: kiểm tra ở ranh giới.',
        minutes: 10,
        content: `## DTO mô tả body hợp lệ

~~~ts
export class CreateCatDto {
  @IsString()
  @MaxLength(50)
  name: string

  @IsInt()
  @Min(0)
  age: number
}
~~~

## ValidationPipe

~~~ts
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, transform: true }),
)
~~~

- Body sai → tự trả **400** kèm lý do.
- \`whitelist\`: bỏ các trường không khai báo trong DTO.
- \`transform\`: đổi body thành instance của DTO (chuỗi số trong query thành number nếu khai báo).

Kiểm tra ở ranh giới API giúp service chỉ nhận dữ liệu đúng.`,
        questions: [
          {
            prompt: 'Body không hợp lệ với DTO thì ValidationPipe trả mã gì?',
            choices: ['200', '400', '500'],
            answer: 1,
            explanation: 'Dữ liệu sai từ client là 400 Bad Request.',
          },
          {
            prompt: 'whitelist: true làm gì?',
            choices: [
              'Chỉ cho IP trong danh sách',
              'Bỏ các trường không có trong DTO',
              'Bỏ qua kiểm tra',
            ],
            answer: 1,
            explanation: 'Trường lạ bị loại, tránh ghi dữ liệu ngoài ý muốn.',
          },
          {
            prompt: 'Vì sao kiểm tra dữ liệu ở controller/DTO?',
            choices: [
              'Vì client luôn gửi đúng',
              'Để service chỉ nhận dữ liệu hợp lệ',
              'Để chạy nhanh hơn',
            ],
            answer: 1,
            explanation:
              'Không tin dữ liệu từ bên ngoài; chặn sớm ở ranh giới.',
          },
        ],
      },
    ],
  },

  // ─── Design patterns ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'creational-patterns',
    category: 'PATTERN',
    title: 'Pattern khởi tạo',
    summary: 'Cách tạo đối tượng linh hoạt: Singleton, Factory Method.',
    lessons: [
      {
        slug: 'singleton',
        title: 'Singleton',
        summary: 'Chỉ một instance cho cả ứng dụng, và khi nào không nên dùng.',
        minutes: 10,
        content: `## Ý tưởng

Một class chỉ có **một instance**, truy cập qua một điểm chung. Ví dụ: kết nối DB, cấu hình.

~~~ts
class Config {
  private static instance?: Config
  private constructor(readonly values: Record<string, string>) {}

  static get(): Config {
    this.instance ??= new Config(loadFromEnv())
    return this.instance
  }
}

Config.get().values.API_URL
~~~

## Trong thực tế

Trong JavaScript, một **module** đã chỉ được nạp một lần, nên \`export const config = load()\` là đủ. Framework có DI (NestJS, Spring) mặc định tạo provider một lần cho cả ứng dụng.

## Nhược điểm

- Là trạng thái toàn cục: khó test vì không thay được bằng bản giả.
- Che giấu phụ thuộc: hàm dùng \`Config.get()\` bên trong, nhìn chữ ký không thấy.

Ưu tiên truyền phụ thuộc vào (dependency injection) thay vì gọi Singleton khắp nơi.`,
        questions: [
          {
            prompt: 'Singleton đảm bảo điều gì?',
            choices: [
              'Class không có thuộc tính',
              'Chỉ có một instance',
              'Không kế thừa được',
            ],
            answer: 1,
            explanation: 'Một instance duy nhất, truy cập qua một điểm chung.',
          },
          {
            prompt: 'Nhược điểm chính của Singleton?',
            choices: [
              'Tốn bộ nhớ',
              'Trạng thái toàn cục, khó test',
              'Chạy chậm',
            ],
            answer: 1,
            explanation:
              'Khó thay bằng bản giả khi test, phụ thuộc bị che giấu.',
          },
          {
            prompt: 'Trong JS, cách đơn giản để có một instance dùng chung?',
            choices: [
              'Export một hằng từ module',
              'Dùng var toàn cục',
              'Gắn vào window',
            ],
            answer: 0,
            explanation: 'Module chỉ chạy một lần, export đã là dùng chung.',
          },
        ],
      },
      {
        slug: 'factory-method',
        title: 'Factory Method',
        summary: 'Tách việc chọn class cụ thể ra khỏi nơi dùng nó.',
        minutes: 10,
        content: `## Vấn đề

Code gửi thông báo đang \`new EmailSender()\` cứng. Thêm SMS, Zalo… sẽ phải sửa nhiều chỗ.

## Giải pháp

Một hàm (factory) quyết định tạo đối tượng nào; nơi dùng chỉ biết **interface**.

~~~ts
interface Sender {
  send(to: string, text: string): Promise<void>
}

class EmailSender implements Sender { /* … */ }
class SmsSender implements Sender { /* … */ }

function createSender(channel: 'email' | 'sms'): Sender {
  switch (channel) {
    case 'email': return new EmailSender()
    case 'sms': return new SmsSender()
  }
}

await createSender(user.channel).send(user.contact, 'Xin chào')
~~~

## Lợi ích

- Thêm loại mới: thêm class và một nhánh trong factory, nơi dùng không đổi.
- Test dễ: thay factory bằng bản trả về sender giả.`,
        questions: [
          {
            prompt: 'Nơi dùng đối tượng do factory tạo cần biết gì?',
            choices: ['Class cụ thể', 'Interface chung', 'Cả hai'],
            answer: 1,
            explanation: 'Chỉ cần interface; class cụ thể do factory chọn.',
          },
          {
            prompt: 'Thêm kênh Zalo với Factory Method thì sửa ở đâu?',
            choices: [
              'Mọi nơi gửi thông báo',
              'Thêm class mới và một nhánh trong factory',
              'Interface Sender',
            ],
            answer: 1,
            explanation: 'Nơi dùng giữ nguyên.',
          },
          {
            prompt: 'Factory Method thuộc nhóm pattern nào?',
            choices: ['Khởi tạo (creational)', 'Cấu trúc', 'Hành vi'],
            answer: 0,
            explanation: 'Nó giải quyết cách tạo đối tượng.',
          },
        ],
      },
    ],
  },
  {
    slug: 'behavioral-patterns',
    category: 'PATTERN',
    title: 'Pattern hành vi',
    summary: 'Cách các đối tượng phối hợp: Observer, Strategy.',
    lessons: [
      {
        slug: 'observer',
        title: 'Observer',
        summary: 'Báo cho nhiều bên khi có sự kiện, mà không phụ thuộc chặt.',
        minutes: 10,
        content: `## Ý tưởng

Một **subject** giữ danh sách **observer**. Khi có sự kiện, subject gọi từng observer. Subject không cần biết observer làm gì.

~~~ts
type Listener<T> = (event: T) => void

class Emitter<T> {
  private listeners = new Set<Listener<T>>()

  on(listener: Listener<T>) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener) // huỷ đăng ký
  }

  emit(event: T) {
    for (const listener of this.listeners) listener(event)
  }
}

const orders = new Emitter<{ id: string }>()
orders.on((o) => sendEmail(o.id))
orders.on((o) => updateStats(o.id))
orders.emit({ id: 'A1' })
~~~

## Gặp ở đâu

\`addEventListener\` của DOM, \`EventEmitter\` của Node.js, store của Redux, pub/sub của Redis.

Nhớ **huỷ đăng ký** khi không cần nữa, nếu không sẽ rò rỉ bộ nhớ.`,
        questions: [
          {
            prompt: 'Subject trong Observer cần biết gì về observer?',
            choices: [
              'Chi tiết xử lý của từng observer',
              'Chỉ cách gọi chúng',
              'Không gì cả, kể cả cách gọi',
            ],
            answer: 1,
            explanation:
              'Subject chỉ gọi hàm/giao diện chung, không biết bên trong.',
          },
          {
            prompt: 'Quên huỷ đăng ký listener gây ra gì?',
            choices: ['Rò rỉ bộ nhớ', 'Lỗi cú pháp', 'Không sao'],
            answer: 0,
            explanation: 'Listener vẫn bị giữ và gọi dù không còn dùng.',
          },
          {
            prompt: 'Ví dụ nào là Observer?',
            choices: ['addEventListener', 'Array.map', 'JSON.parse'],
            answer: 0,
            explanation: 'Đăng ký hàm được gọi khi sự kiện xảy ra.',
          },
        ],
      },
      {
        slug: 'strategy',
        title: 'Strategy',
        summary: 'Đổi thuật toán lúc chạy thay vì chuỗi if/else dài.',
        minutes: 10,
        content: `## Vấn đề

~~~ts
function shippingFee(order: Order) {
  if (order.method === 'standard') return 20_000
  else if (order.method === 'express') return order.weight * 15_000
  else if (order.method === 'pickup') return 0
  // … mỗi cách mới lại thêm một nhánh
}
~~~

## Giải pháp

Mỗi cách tính là một **strategy** cùng giao diện; chọn strategy theo dữ liệu.

~~~ts
type FeeStrategy = (order: Order) => number

const FEES: Record<Order['method'], FeeStrategy> = {
  standard: () => 20_000,
  express: (o) => o.weight * 15_000,
  pickup: () => 0,
}

const fee = FEES[order.method](order)
~~~

## Khi nào dùng

- Nhiều biến thể của cùng một việc (tính phí, sắp xếp, nén, xác thực).
- Muốn thêm biến thể mà không sửa code đang chạy.

Trong TypeScript, strategy thường chỉ là một **hàm**; không cần class.`,
        questions: [
          {
            prompt: 'Strategy thay thế điều gì?',
            choices: [
              'Chuỗi if/else chọn thuật toán',
              'Vòng lặp',
              'Biến toàn cục',
            ],
            answer: 0,
            explanation: 'Mỗi nhánh thành một strategy, chọn bằng tra bảng.',
          },
          {
            prompt: 'Các strategy cần có điểm chung nào?',
            choices: ['Cùng tên file', 'Cùng giao diện', 'Cùng tác giả'],
            answer: 1,
            explanation: 'Cùng chữ ký để thay thế nhau được.',
          },
          {
            prompt: 'Trong TypeScript, strategy đơn giản nhất là gì?',
            choices: ['Một class trừu tượng', 'Một hàm', 'Một enum'],
            answer: 1,
            explanation: 'Hàm là giá trị, truyền và tra bảng được.',
          },
        ],
      },
    ],
  },

  // ─── Fundamentals ────────────────────────────────────────────────────────────────────────────
  {
    slug: 'git',
    category: 'FUNDAMENTAL',
    title: 'Git',
    summary: 'Quản lý phiên bản: commit, nhánh, merge và làm việc nhóm.',
    lessons: [
      {
        slug: 'commit',
        title: 'Commit và lịch sử',
        summary: 'Ba vùng của Git và cách ghi lại thay đổi.',
        minutes: 10,
        content: `## Ba vùng

1. **Working tree**: file bạn đang sửa.
2. **Staging area**: thay đổi đã chọn cho commit tới (\`git add\`).
3. **Repository**: lịch sử các commit (\`git commit\`).

~~~bash
git status                 # đang có gì thay đổi
git add src/app.ts         # chọn file vào staging
git commit -m "feat(api): add cats endpoint"
git log --oneline          # xem lịch sử
~~~

## Commit tốt

- Mỗi commit một thay đổi có ý nghĩa, build được.
- Tiêu đề ngắn, nói **làm gì**; thân commit nói **vì sao**.
- Nhiều team dùng Conventional Commits: \`type(scope): subject\`.

## Sửa sai

~~~bash
git restore file.ts          # bỏ thay đổi chưa add
git restore --staged file.ts # bỏ khỏi staging, giữ thay đổi
git commit --amend           # sửa commit cuối (chưa push)
~~~`,
        questions: [
          {
            prompt: 'git add làm gì?',
            choices: [
              'Tạo commit',
              'Đưa thay đổi vào staging area',
              'Đẩy lên server',
            ],
            answer: 1,
            explanation: 'add chọn thay đổi cho commit kế tiếp.',
          },
          {
            prompt: 'Thân commit message nên nói gì?',
            choices: ['Tên người sửa', 'Vì sao thay đổi', 'Danh sách file'],
            answer: 1,
            explanation:
              'Diff đã cho thấy sửa gì; lý do thì chỉ người viết biết.',
          },
          {
            prompt: 'Lệnh nào bỏ thay đổi chưa add của một file?',
            choices: [
              'git restore file.ts',
              'git reset --hard',
              'git rm file.ts',
            ],
            answer: 0,
            explanation: 'restore đưa file về bản trong staging/commit cuối.',
          },
        ],
      },
      {
        slug: 'nhanh-va-merge',
        title: 'Nhánh, merge và pull request',
        summary: 'Làm việc song song mà không giẫm chân nhau.',
        minutes: 12,
        content: `## Nhánh

Nhánh là một con trỏ tới commit. Tạo nhánh rất rẻ.

~~~bash
git switch develop
git pull
git switch -c feature/login-form
# … sửa, commit …
git push -u origin feature/login-form
~~~

## Merge và rebase

- **merge**: tạo commit gộp, giữ nguyên lịch sử hai nhánh.
- **rebase**: đặt lại commit của bạn lên đầu nhánh đích, lịch sử thẳng. Chỉ rebase nhánh **chưa ai dùng chung**.

## Pull request

Đẩy nhánh lên, mở PR vào nhánh chính. Đồng đội review, CI chạy test, xong mới merge.

## Xung đột

Khi hai nhánh sửa cùng dòng, Git dừng lại và đánh dấu:

~~~
<<<<<<< HEAD
const limit = 20
=======
const limit = 50
>>>>>>> feature/x
~~~

Chọn bản đúng, xoá dấu, \`git add\` rồi tiếp tục merge hoặc rebase.`,
        questions: [
          {
            prompt: 'Nhánh trong Git thực chất là gì?',
            choices: [
              'Bản sao toàn bộ code',
              'Con trỏ tới một commit',
              'Một thư mục',
            ],
            answer: 1,
            explanation: 'Vì vậy tạo nhánh rất nhanh và nhẹ.',
          },
          {
            prompt: 'Khi nào không nên rebase?',
            choices: [
              'Nhánh chỉ mình bạn dùng',
              'Nhánh người khác đang dùng chung',
              'Nhánh mới tạo',
            ],
            answer: 1,
            explanation:
              'Rebase viết lại lịch sử, làm hỏng bản của người khác.',
          },
          {
            prompt: 'Sau khi sửa xong xung đột, bước tiếp theo?',
            choices: ['git add file đã sửa', 'git reset', 'Xoá nhánh'],
            answer: 0,
            explanation: 'add đánh dấu xung đột đã giải quyết.',
          },
        ],
      },
    ],
  },
  {
    slug: 'http',
    category: 'FUNDAMENTAL',
    title: 'HTTP và REST API',
    summary: 'Cách trình duyệt và server nói chuyện.',
    lessons: [
      {
        slug: 'request-response',
        title: 'Request, response và status code',
        summary: 'Method, header, body và ý nghĩa của các mã trạng thái.',
        minutes: 12,
        content: `## Request

~~~http
POST /api/cats HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer <token>

{"name": "Mướp"}
~~~

## Method

| Method | Dùng để | An toàn | Idempotent |
| --- | --- | --- | --- |
| GET | Đọc | Có | Có |
| POST | Tạo mới | Không | Không |
| PUT | Thay thế toàn bộ | Không | Có |
| PATCH | Sửa một phần | Không | Không bắt buộc |
| DELETE | Xoá | Không | Có |

**Idempotent**: gọi nhiều lần cho cùng kết quả như gọi một lần.

## Status code

- **2xx** thành công: 200 OK, 201 Created, 204 No Content.
- **4xx** lỗi phía client: 400 dữ liệu sai, 401 chưa đăng nhập, 403 không có quyền, 404 không có, 409 xung đột, 429 gọi quá nhanh.
- **5xx** lỗi phía server: 500, 502, 503.`,
        questions: [
          {
            prompt: 'Chưa đăng nhập thì API nên trả mã nào?',
            choices: ['401', '403', '404'],
            answer: 0,
            explanation:
              '401: chưa xác thực. 403: đã biết là ai nhưng không có quyền.',
          },
          {
            prompt: 'Method nào dùng để đọc dữ liệu và không được thay đổi gì?',
            choices: ['POST', 'GET', 'PATCH'],
            answer: 1,
            explanation: 'GET là method an toàn.',
          },
          {
            prompt: 'Tạo bản ghi thành công nên trả mã nào?',
            choices: ['200', '201', '204'],
            answer: 1,
            explanation: '201 Created.',
          },
        ],
      },
      {
        slug: 'rest',
        title: 'Thiết kế REST API',
        summary: 'URL theo tài nguyên, phân trang và lỗi nhất quán.',
        minutes: 10,
        content: `## URL là danh từ

~~~
GET    /api/cats          danh sách
POST   /api/cats          tạo
GET    /api/cats/42       một con
PATCH  /api/cats/42       sửa
DELETE /api/cats/42       xoá
GET    /api/cats/42/toys  tài nguyên con
~~~

Động từ nằm ở **method**, không nằm trong URL (\`/getCats\` là không nên).

## Danh sách có phân trang

~~~
GET /api/cats?page=2&pageSize=20&sortBy=name&sortDir=asc
~~~

~~~json
{ "items": [], "total": 135, "page": 2, "pageSize": 20, "totalPages": 7 }
~~~

## Lỗi nhất quán

Mọi lỗi cùng một dạng, có mã và thông điệp đọc được:

~~~json
{ "statusCode": 400, "message": ["name must be a string"], "error": "Bad Request" }
~~~`,
        questions: [
          {
            prompt: 'URL nào đúng kiểu REST để xoá con mèo 42?',
            choices: [
              'POST /api/deleteCat?id=42',
              'DELETE /api/cats/42',
              'GET /api/cats/42/delete',
            ],
            answer: 1,
            explanation: 'Method nói hành động, URL chỉ tài nguyên.',
          },
          {
            prompt: 'Vì sao danh sách cần phân trang?',
            choices: [
              'Để URL dài hơn',
              'Tránh trả quá nhiều dữ liệu một lần',
              'Bắt buộc của HTTP',
            ],
            answer: 1,
            explanation:
              'Giữ response nhỏ, nhanh, ổn định khi dữ liệu lớn dần.',
          },
          {
            prompt: 'Tài nguyên con "đồ chơi của mèo 42" nên có URL nào?',
            choices: [
              '/api/toys-of-42',
              '/api/cats/42/toys',
              '/api/getToys/42',
            ],
            answer: 1,
            explanation: 'Lồng theo quan hệ cha – con.',
          },
        ],
      },
    ],
  },

  // ─── Tools ───────────────────────────────────────────────────────────────────────────────────
  {
    slug: 'docker',
    category: 'TOOL',
    title: 'Docker',
    summary: 'Đóng gói ứng dụng cùng môi trường chạy của nó.',
    lessons: [
      {
        slug: 'image-container',
        title: 'Image, container và Dockerfile',
        summary: 'Từ Dockerfile tới container đang chạy.',
        minutes: 12,
        content: `## Khái niệm

- **Image**: bản đóng gói chỉ đọc (code + runtime + thư viện).
- **Container**: một lần chạy của image, có file system và tiến trình riêng.

## Dockerfile

~~~dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "dist/main.js"]
~~~

Chép file khai báo thư viện **trước** code: khi chỉ code đổi, Docker dùng lại lớp cache của bước cài thư viện.

## Lệnh thường dùng

~~~bash
docker build -t my-api .
docker run -p 3000:3000 --env-file .env my-api
docker ps
docker logs -f <container>
~~~`,
        questions: [
          {
            prompt: 'Container là gì so với image?',
            choices: [
              'Một lần chạy của image',
              'Bản nén của image',
              'Một máy ảo đầy đủ',
            ],
            answer: 0,
            explanation: 'Image là khuôn, container là thứ chạy từ khuôn đó.',
          },
          {
            prompt: 'Vì sao COPY package.json trước COPY . . ?',
            choices: [
              'Để tận dụng cache bước cài thư viện',
              'Bắt buộc của Docker',
              'Để image nhỏ hơn',
            ],
            answer: 0,
            explanation: 'Code đổi thường xuyên; thư viện ít đổi hơn.',
          },
          {
            prompt: '-p 3000:3000 làm gì?',
            choices: [
              'Đặt số tiến trình',
              'Mở cổng 3000 của máy vào cổng 3000 của container',
              'Giới hạn bộ nhớ',
            ],
            answer: 1,
            explanation: 'Ánh xạ cổng host:container.',
          },
        ],
      },
      {
        slug: 'compose',
        title: 'Docker Compose',
        summary: 'Chạy app cùng Postgres, Redis bằng một lệnh.',
        minutes: 10,
        content: `## compose.yaml

~~~yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD', 'pg_isready', '-U', 'postgres']

  api:
    build: .
    ports: ['3000:3000']
    environment:
      DATABASE_URL: postgresql://postgres:secret@db:5432/postgres
    depends_on:
      db:
        condition: service_healthy

volumes:
  db-data:
~~~

- Các service gọi nhau bằng **tên service** (\`db\`), không phải \`localhost\`.
- **volume** giữ dữ liệu khi container bị xoá.
- \`depends_on\` + \`healthcheck\`: chỉ chạy api khi DB đã sẵn sàng.

~~~bash
docker compose up -d
docker compose logs -f api
docker compose down        # thêm -v để xoá cả volume
~~~`,
        questions: [
          {
            prompt: 'Trong compose, api kết nối tới db bằng host nào?',
            choices: ['localhost', 'db', '127.0.0.1'],
            answer: 1,
            explanation: 'Tên service là hostname trong mạng của compose.',
          },
          {
            prompt: 'Volume dùng để làm gì?',
            choices: [
              'Giữ dữ liệu khi container bị xoá',
              'Tăng âm lượng log',
              'Giới hạn CPU',
            ],
            answer: 0,
            explanation: 'Dữ liệu nằm ngoài vòng đời của container.',
          },
          {
            prompt: 'docker compose down -v khác down ở điểm nào?',
            choices: ['Xoá cả volume', 'Chạy nhanh hơn', 'Không khác'],
            answer: 0,
            explanation: 'Cẩn thận: -v xoá luôn dữ liệu DB.',
          },
        ],
      },
    ],
  },
]

export const STUDIO_ROADMAPS: SeedRoadmap[] = [
  {
    slug: 'frontend',
    title: 'Frontend',
    summary: 'Từ JavaScript tới ứng dụng web React / Next.js.',
    steps: [
      {
        title: 'Git cơ bản',
        description: 'Lưu và chia sẻ code trước khi viết dòng đầu tiên.',
        track: 'git',
      },
      {
        title: 'HTTP',
        description: 'Trình duyệt lấy dữ liệu từ server thế nào.',
        track: 'http',
      },
      {
        title: 'JavaScript',
        description: 'Ngôn ngữ của trình duyệt, nhất là bất đồng bộ.',
        track: 'javascript',
      },
      {
        title: 'TypeScript',
        description: 'Thêm kiểu để bắt lỗi sớm.',
        track: 'typescript',
      },
      {
        title: 'React',
        description: 'Component, props, state.',
        track: 'react',
      },
      {
        title: 'Next.js',
        description: 'Định tuyến, render trên server, triển khai.',
        track: 'nextjs',
      },
    ],
  },
  {
    slug: 'backend',
    title: 'Backend',
    summary: 'API, cơ sở dữ liệu, kiến trúc và triển khai.',
    steps: [
      {
        title: 'Git cơ bản',
        description: 'Quản lý phiên bản và làm việc nhóm.',
        track: 'git',
      },
      {
        title: 'HTTP và REST',
        description: 'Thiết kế API rõ ràng, nhất quán.',
        track: 'http',
      },
      {
        title: 'Một ngôn ngữ backend',
        description: 'TypeScript (Node.js), Python hoặc Go.',
        track: 'typescript',
      },
      {
        title: 'NestJS',
        description: 'Tổ chức backend theo module, DI, validation.',
        track: 'nestjs',
      },
      {
        title: 'Design pattern',
        description: 'Factory, Strategy, Observer trong code thật.',
        track: 'behavioral-patterns',
      },
      {
        title: 'Docker',
        description: 'Đóng gói và chạy cùng Postgres, Redis.',
        track: 'docker',
      },
    ],
  },
]
