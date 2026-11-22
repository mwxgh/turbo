/**
 * TOEIC vocabulary decks by topic (written for Lingo; 6 × 40 words): loaded with the samples by
 * POST /lingo/admin/samples, same CSV as a deck import file. Generated: edit the words here, keep
 * terms unique across decks and the starter deck.
 */
export const TOEIC_TOPIC_DECKS: {
  slug: string
  title: string
  description: string
  csv: string
}[] = [
  {
    slug: 'office',
    title: 'TOEIC 01 · Văn phòng & cuộc họp',
    description: 'Công việc văn phòng, cuộc họp, lịch làm việc, thiết bị.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
attend,v,/əˈtend/,tham dự,All managers must attend the meeting on Monday.,Tất cả quản lý phải dự cuộc họp thứ Hai.,Office
minutes,n,/ˈmɪnɪts/,biên bản cuộc họp,Ms. Lee will take the minutes today.,Hôm nay cô Lee sẽ ghi biên bản.,Office
reschedule,v,/ˌriːˈʃedjuːl/,"dời lịch, sắp xếp lại lịch",Can we reschedule the call to Thursday?,Chúng ta dời cuộc gọi sang thứ Năm được không?,Office
conference room,n,/ˈkɒnfərəns ruːm/,phòng họp,The conference room is booked until noon.,Phòng họp đã được đặt đến trưa.,Office
memo,n,/ˈmeməʊ/,thông báo nội bộ,Please read the memo about the new policy.,Vui lòng đọc thông báo về chính sách mới.,Office
distribute,v,/dɪˈstrɪbjuːt/,phân phát,He distributed the handouts before the talk.,Anh ấy phát tài liệu trước buổi nói chuyện.,Office
handout,n,/ˈhændaʊt/,tài liệu phát tay,There are extra handouts on the table.,Có thêm tài liệu trên bàn.,Office
photocopy,v,/ˈfəʊtəʊkɒpi/,"photo, sao chụp",Could you photocopy this contract for me?,Bạn photo giúp tôi hợp đồng này được không?,Office
stationery,n,/ˈsteɪʃənri/,văn phòng phẩm,Order more stationery before Friday.,Đặt thêm văn phòng phẩm trước thứ Sáu.,Office
file,v,/faɪl/,sắp xếp hồ sơ; nộp (đơn),Please file these invoices by date.,Hãy xếp các hoá đơn này theo ngày.,Office
cabinet,n,/ˈkæbɪnət/,tủ (hồ sơ),The records are in the filing cabinet.,Hồ sơ nằm trong tủ đựng hồ sơ.,Office
extension,n,/ɪkˈstenʃn/,số máy lẻ; sự gia hạn,Call me at extension 305.,Gọi tôi theo số máy lẻ 305.,Office
in charge of,phr,/ɪn tʃɑːdʒ əv/,phụ trách,Mr. Brown is in charge of the project.,Ông Brown phụ trách dự án.,Office
assign,v,/əˈsaɪn/,giao (việc),The manager assigned the task to Kim.,Quản lý giao việc cho Kim.,Office
delegate,v,/ˈdelɪɡeɪt/,"uỷ quyền, giao bớt việc",Good leaders delegate routine work.,Lãnh đạo giỏi giao bớt việc thường ngày.,Office
workload,n,/ˈwɜːkləʊd/,khối lượng công việc,Her workload doubled this month.,Khối lượng việc của cô ấy tăng gấp đôi tháng này.,Office
priority,n,/praɪˈɒrəti/,việc ưu tiên,Customer safety is our top priority.,An toàn khách hàng là ưu tiên hàng đầu.,Office
remind,v,/rɪˈmaɪnd/,nhắc nhở,Remind me to call the supplier.,Nhắc tôi gọi nhà cung cấp nhé.,Office
confirm,v,/kənˈfɜːm/,xác nhận,Please confirm your attendance by email.,Vui lòng xác nhận tham dự qua email.,Office
attach,v,/əˈtætʃ/,đính kèm,I have attached the report to this email.,Tôi đã đính kèm báo cáo vào email này.,Office
forward,v,/ˈfɔːwəd/,chuyển tiếp,I'll forward the message to the team.,Tôi sẽ chuyển tiếp tin nhắn cho nhóm.,Office
draft,n,/drɑːft/,bản nháp,Send me the first draft by Wednesday.,Gửi tôi bản nháp đầu tiên trước thứ Tư.,Office
revise,v,/rɪˈvaɪz/,chỉnh sửa,We need to revise the schedule.,Chúng ta cần sửa lại lịch.,Office
approve,v,/əˈpruːv/,phê duyệt,The director approved the plan.,Giám đốc đã duyệt kế hoạch.,Office
submit,v,/səbˈmɪt/,nộp,Submit your timesheet every Friday.,Nộp bảng chấm công mỗi thứ Sáu.,Office
headquarters,n,/ˌhedˈkwɔːtəz/,trụ sở chính,Our headquarters is in Singapore.,Trụ sở chính của chúng tôi ở Singapore.,Office
branch,n,/brɑːntʃ/,chi nhánh,The bank opened a new branch downtown.,Ngân hàng mở chi nhánh mới ở trung tâm.,Office
department,n,/dɪˈpɑːtmənt/,phòng ban,She works in the legal department.,Cô ấy làm ở phòng pháp chế.,Office
executive,n,/ɪɡˈzekjətɪv/,"giám đốc điều hành, lãnh đạo",Several executives will join the call.,Vài lãnh đạo sẽ tham gia cuộc gọi.,Office
presentation,n,/ˌpreznˈteɪʃn/,bài thuyết trình,Her presentation impressed the clients.,Bài thuyết trình của cô ấy gây ấn tượng với khách.,Office
projector,n,/prəˈdʒektə/,máy chiếu,The projector isn't working.,Máy chiếu không hoạt động.,Office
maintenance,n,/ˈmeɪntənəns/,bảo trì,The elevator is closed for maintenance.,Thang máy đóng để bảo trì.,Office
out of order,phr,/aʊt əv ˈɔːdə/,"hỏng, không hoạt động",The printer on this floor is out of order.,Máy in tầng này bị hỏng.,Office
supply,n,/səˈplaɪ/,"đồ dùng, nguồn cung",Office supplies are kept in room 2B.,Đồ dùng văn phòng để ở phòng 2B.,Office
lobby,n,/ˈlɒbi/,sảnh,Visitors should wait in the lobby.,Khách nên đợi ở sảnh.,Office
badge,n,/bædʒ/,"thẻ tên, thẻ ra vào",Wear your badge at all times.,Luôn đeo thẻ ra vào.,Office
shift,n,/ʃɪft/,ca làm việc,He works the night shift this week.,Tuần này anh ấy làm ca đêm.,Office
overtime,n,/ˈəʊvətaɪm/,giờ làm thêm,Overtime is paid at a higher rate.,Giờ làm thêm được trả lương cao hơn.,Office
on leave,phr,/ɒn liːv/,đang nghỉ phép,Ms. Garcia is on leave until June.,Cô Garcia nghỉ phép đến tháng Sáu.,Office
cover for,phr,/ˈkʌvə fə/,làm thay (ai),Can you cover for me tomorrow?,Mai bạn làm thay tôi được không?,Office
`,
  },
  {
    slug: 'hr',
    title: 'TOEIC 02 · Nhân sự & tuyển dụng',
    description: 'Tuyển dụng, phỏng vấn, đào tạo, lương thưởng, đánh giá.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
recruit,v,/rɪˈkruːt/,tuyển dụng,We plan to recruit ten engineers.,Chúng tôi dự định tuyển mười kỹ sư.,HR
applicant,n,/ˈæplɪkənt/,người nộp đơn,Each applicant must submit a résumé.,Mỗi ứng viên phải nộp sơ yếu lý lịch.,HR
apply for,phr,/əˈplaɪ fə/,"ứng tuyển, nộp đơn",She applied for the sales position.,Cô ấy ứng tuyển vị trí bán hàng.,HR
résumé,n,/ˈrezjuːmeɪ/,sơ yếu lý lịch,Please attach your résumé.,Vui lòng đính kèm sơ yếu lý lịch.,HR
reference,n,/ˈrefrəns/,"thư giới thiệu, người giới thiệu",Two references are required.,Cần hai người giới thiệu.,HR
interview,n,/ˈɪntəvjuː/,buổi phỏng vấn,The interview lasted one hour.,Buổi phỏng vấn kéo dài một giờ.,HR
job opening,n,/dʒɒb ˈəʊpnɪŋ/,vị trí đang tuyển,There is a job opening in accounting.,Phòng kế toán đang có vị trí tuyển.,HR
requirement,n,/rɪˈkwaɪəmənt/,yêu cầu,Fluent English is a requirement.,Tiếng Anh lưu loát là yêu cầu bắt buộc.,HR
experience,n,/ɪkˈspɪəriəns/,kinh nghiệm,Five years of experience is preferred.,Ưu tiên có năm năm kinh nghiệm.,HR
hire,v,/haɪə/,"thuê, tuyển",The firm hired a new designer.,Công ty thuê một nhà thiết kế mới.,HR
employee,n,/ɪmˈplɔɪiː/,nhân viên,All employees get a parking pass.,Mọi nhân viên được cấp vé gửi xe.,HR
employer,n,/ɪmˈplɔɪə/,người sử dụng lao động,Her employer offers flexible hours.,Công ty cô ấy có giờ làm linh hoạt.,HR
personnel,n,/ˌpɜːsəˈnel/,nhân sự,Personnel records are confidential.,Hồ sơ nhân sự được bảo mật.,HR
orientation,n,/ˌɔːriənˈteɪʃn/,buổi định hướng nhân viên mới,New staff attend an orientation session.,Nhân viên mới dự buổi định hướng.,HR
training,n,/ˈtreɪnɪŋ/,đào tạo,Safety training is mandatory.,Đào tạo an toàn là bắt buộc.,HR
workshop,n,/ˈwɜːkʃɒp/,hội thảo thực hành,Register for the leadership workshop.,Đăng ký hội thảo về lãnh đạo.,HR
salary,n,/ˈsæləri/,lương,The salary depends on experience.,Lương tuỳ theo kinh nghiệm.,HR
wage,n,/weɪdʒ/,tiền công (theo giờ),The minimum wage rose this year.,Lương tối thiểu tăng năm nay.,HR
raise,n,/reɪz/,sự tăng lương,He asked for a raise.,Anh ấy xin tăng lương.,HR
bonus,n,/ˈbəʊnəs/,tiền thưởng,Staff received a year-end bonus.,Nhân viên nhận thưởng cuối năm.,HR
payroll,n,/ˈpeɪrəʊl/,bảng lương,Payroll is processed on the 25th.,Bảng lương được xử lý ngày 25.,HR
performance,n,/pəˈfɔːməns/,"hiệu suất, thành tích",Bonuses are based on performance.,Thưởng dựa trên hiệu suất.,HR
evaluation,n,/ɪˌvæljuˈeɪʃn/,sự đánh giá,Annual evaluations start next week.,Đánh giá năm bắt đầu tuần sau.,HR
promotion,n,/prəˈməʊʃn/,sự thăng chức; khuyến mãi,She earned a promotion to manager.,Cô ấy được thăng chức lên quản lý.,HR
transfer,v,/trænsˈfɜː/,thuyên chuyển; chuyển (tiền),He was transferred to the Tokyo office.,Anh ấy được chuyển sang văn phòng Tokyo.,HR
resign,v,/rɪˈzaɪn/,"từ chức, nghỉ việc",The CFO resigned last month.,Giám đốc tài chính nghỉ việc tháng trước.,HR
retire,v,/rɪˈtaɪə/,nghỉ hưu,Mr. Ito will retire in March.,Ông Ito sẽ nghỉ hưu vào tháng Ba.,HR
replacement,n,/rɪˈpleɪsmənt/,người/vật thay thế,We need a replacement for Anna.,Chúng ta cần người thay Anna.,HR
full-time,adj,/ˌfʊl ˈtaɪm/,toàn thời gian,This is a full-time position.,Đây là vị trí toàn thời gian.,HR
part-time,adj,/ˌpɑːt ˈtaɪm/,bán thời gian,Students can work part-time.,Sinh viên có thể làm bán thời gian.,HR
contract,n,/ˈkɒntrækt/,hợp đồng,Sign the contract before you start.,Ký hợp đồng trước khi bắt đầu.,HR
probation,n,/prəˈbeɪʃn/,thời gian thử việc,The probation period is three months.,Thời gian thử việc là ba tháng.,HR
vacancy,n,/ˈveɪkənsi/,vị trí trống; phòng trống,The vacancy was filled quickly.,Vị trí trống đã được tuyển nhanh.,HR
eligible,adj,/ˈelɪdʒəbl/,đủ điều kiện,Staff are eligible for paid leave.,Nhân viên đủ điều kiện nghỉ có lương.,HR
incentive,n,/ɪnˈsentɪv/,"ưu đãi, khuyến khích",Sales staff get extra incentives.,Nhân viên bán hàng có thêm khoản khuyến khích.,HR
mentor,n,/ˈmentɔː/,người hướng dẫn,Each new hire has a mentor.,Mỗi người mới đều có người kèm.,HR
job description,n,/dʒɒb dɪˈskrɪpʃn/,mô tả công việc,Read the job description carefully.,Đọc kỹ mô tả công việc.,HR
certificate,n,/səˈtɪfɪkət/,chứng chỉ,Attach a copy of your certificate.,Đính kèm bản sao chứng chỉ.,HR
dedicated,adj,/ˈdedɪkeɪtɪd/,tận tuỵ,She is a dedicated team member.,Cô ấy là thành viên tận tuỵ.,HR
staff,n,/stɑːf/,nhân viên (tập thể),The staff meeting starts at nine.,Cuộc họp nhân viên bắt đầu lúc chín giờ.,HR
`,
  },
  {
    slug: 'finance',
    title: 'TOEIC 03 · Tài chính & kế toán',
    description: 'Ngân hàng, thanh toán, chi phí, báo cáo tài chính.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
account,n,/əˈkaʊnt/,tài khoản,Open an account at any branch.,Mở tài khoản ở bất kỳ chi nhánh nào.,Finance
balance,n,/ˈbæləns/,số dư,Check your balance online.,Kiểm tra số dư trực tuyến.,Finance
deposit,v,/dɪˈpɒzɪt/,gửi (tiền),I deposited the check this morning.,Tôi đã gửi tấm séc sáng nay.,Finance
withdraw,v,/wɪðˈdrɔː/,rút (tiền),You can withdraw cash at the ATM.,Bạn có thể rút tiền ở cây ATM.,Finance
transaction,n,/trænˈzækʃn/,giao dịch,Each transaction is recorded.,Mỗi giao dịch đều được ghi lại.,Finance
statement,n,/ˈsteɪtmənt/,bản sao kê,Your monthly statement is attached.,Sao kê hằng tháng được đính kèm.,Finance
expense,n,/ɪkˈspens/,chi phí,Travel expenses will be covered.,Chi phí đi lại sẽ được chi trả.,Finance
receipt,n,/rɪˈsiːt/,biên lai,Keep all receipts for your records.,Giữ mọi biên lai để lưu.,Finance
payment,n,/ˈpeɪmənt/,khoản thanh toán,Payment is due within 30 days.,Thanh toán trong vòng 30 ngày.,Finance
overdue,adj,/ˌəʊvəˈdjuː/,quá hạn,This invoice is two weeks overdue.,Hoá đơn này quá hạn hai tuần.,Finance
loan,n,/ləʊn/,khoản vay,The company took out a bank loan.,Công ty đã vay ngân hàng.,Finance
interest rate,n,/ˈɪntrəst reɪt/,lãi suất,Interest rates rose again.,Lãi suất lại tăng.,Finance
profit,n,/ˈprɒfɪt/,lợi nhuận,Profits increased by 8 percent.,Lợi nhuận tăng 8%.,Finance
loss,n,/lɒs/,khoản lỗ,The store reported a loss.,Cửa hàng báo lỗ.,Finance
fiscal year,n,/ˈfɪskl jɪə/,năm tài chính,The fiscal year ends in June.,Năm tài chính kết thúc vào tháng Sáu.,Finance
quarter,n,/ˈkwɔːtə/,quý,Sales were strong in the third quarter.,Doanh số quý ba khả quan.,Finance
audit,n,/ˈɔːdɪt/,kiểm toán,The annual audit begins Monday.,Đợt kiểm toán năm bắt đầu thứ Hai.,Finance
accountant,n,/əˈkaʊntənt/,kế toán viên,Ask the accountant about the tax form.,Hỏi kế toán về tờ khai thuế.,Finance
tax,n,/tæks/,thuế,Prices include sales tax.,Giá đã gồm thuế bán hàng.,Finance
financial,adj,/faɪˈnænʃl/,thuộc tài chính,The financial report is ready.,Báo cáo tài chính đã sẵn sàng.,Finance
cost,n,/kɒst/,"chi phí, giá",We must cut costs this year.,Năm nay phải cắt giảm chi phí.,Finance
afford,v,/əˈfɔːd/,đủ khả năng chi trả,We can't afford a new office yet.,Chưa đủ tiền thuê văn phòng mới.,Finance
allocate,v,/ˈæləkeɪt/,phân bổ,Funds were allocated to marketing.,Ngân sách được phân bổ cho marketing.,Finance
fund,n,/fʌnd/,"quỹ, nguồn tiền",The fund supports local artists.,Quỹ hỗ trợ nghệ sĩ địa phương.,Finance
investment,n,/ɪnˈvestmənt/,khoản đầu tư,The new machine was a good investment.,Máy mới là khoản đầu tư tốt.,Finance
shareholder,n,/ˈʃeəhəʊldə/,cổ đông,Shareholders meet once a year.,Cổ đông họp mỗi năm một lần.,Finance
merger,n,/ˈmɜːdʒə/,sự sáp nhập,The merger was announced today.,Thương vụ sáp nhập được công bố hôm nay.,Finance
acquire,v,/əˈkwaɪə/,mua lại; đạt được,The firm acquired a rival.,Công ty mua lại một đối thủ.,Finance
figure,n,/ˈfɪɡə/,số liệu,The sales figures look good.,Số liệu doanh số khả quan.,Finance
spreadsheet,n,/ˈspredʃiːt/,bảng tính,Update the spreadsheet daily.,Cập nhật bảng tính hằng ngày.,Finance
reimbursement,n,/ˌriːɪmˈbɜːsmənt/,khoản hoàn tiền,Submit forms for reimbursement.,Nộp mẫu đơn để được hoàn tiền.,Finance
charge,v,/tʃɑːdʒ/,tính phí,The bank charges a small fee.,Ngân hàng tính một khoản phí nhỏ.,Finance
fee,n,/fiː/,phí,There is no fee for online transfers.,Chuyển khoản trực tuyến miễn phí.,Finance
installment,n,/ɪnˈstɔːlmənt/,khoản trả góp,Pay in three monthly installments.,Trả góp ba kỳ hằng tháng.,Finance
currency,n,/ˈkʌrənsi/,tiền tệ,Prices are shown in local currency.,Giá hiển thị bằng tiền địa phương.,Finance
exchange rate,n,/ɪksˈtʃeɪndʒ reɪt/,tỉ giá,Check today's exchange rate.,Kiểm tra tỉ giá hôm nay.,Finance
economic,adj,/ˌiːkəˈnɒmɪk/,thuộc kinh tế,Economic growth slowed last year.,Tăng trưởng kinh tế chậm lại năm ngoái.,Finance
forecast,n,/ˈfɔːkɑːst/,dự báo,The sales forecast is optimistic.,Dự báo doanh số khá lạc quan.,Finance
approximately,adv,/əˈprɒksɪmətli/,xấp xỉ,The repair costs approximately $500.,Sửa chữa tốn khoảng 500 đô.,Finance
expenditure,n,/ɪkˈspendɪtʃə/,khoản chi tiêu,Expenditure on training rose.,Chi tiêu cho đào tạo tăng.,Finance
`,
  },
  {
    slug: 'marketing',
    title: 'TOEIC 04 · Marketing & bán hàng',
    description: 'Quảng cáo, khách hàng, sản phẩm, giá cả, khuyến mãi.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
advertise,v,/ˈædvətaɪz/,quảng cáo,We advertise on social media.,Chúng tôi quảng cáo trên mạng xã hội.,Marketing
advertisement,n,/ədˈvɜːtɪsmənt/,mẩu quảng cáo,I saw your advertisement in the paper.,Tôi thấy quảng cáo của bạn trên báo.,Marketing
campaign,n,/kæmˈpeɪn/,chiến dịch,The campaign starts in April.,Chiến dịch bắt đầu vào tháng Tư.,Marketing
brand,n,/brænd/,thương hiệu,The brand is popular with teenagers.,Thương hiệu được giới trẻ ưa chuộng.,Marketing
customer,n,/ˈkʌstəmə/,khách hàng,Customer feedback was positive.,Phản hồi của khách hàng tích cực.,Marketing
client,n,/ˈklaɪənt/,khách hàng (dịch vụ),We are meeting a new client today.,Hôm nay gặp một khách hàng mới.,Marketing
consumer,n,/kənˈsjuːmə/,người tiêu dùng,Consumers want lower prices.,Người tiêu dùng muốn giá thấp hơn.,Marketing
market research,n,/ˈmɑːkɪt rɪˈsɜːtʃ/,nghiên cứu thị trường,Market research shows strong demand.,Nghiên cứu thị trường cho thấy nhu cầu cao.,Marketing
demand,n,/dɪˈmɑːnd/,nhu cầu,Demand for electric cars is growing.,Nhu cầu xe điện đang tăng.,Marketing
target,v,/ˈtɑːɡɪt/,nhắm tới,The ad targets young parents.,Quảng cáo nhắm tới cha mẹ trẻ.,Marketing
feature,n,/ˈfiːtʃə/,tính năng,The phone has a new camera feature.,Điện thoại có tính năng camera mới.,Marketing
product line,n,/ˈprɒdʌkt laɪn/,dòng sản phẩm,They expanded their product line.,Họ mở rộng dòng sản phẩm.,Marketing
discount,n,/ˈdɪskaʊnt/,giảm giá,Members get a 10 percent discount.,Thành viên được giảm 10%.,Marketing
promotional,adj,/prəˈməʊʃənl/,mang tính khuyến mãi,Promotional prices end on Sunday.,Giá khuyến mãi kết thúc Chủ nhật.,Marketing
coupon,n,/ˈkuːpɒn/,phiếu giảm giá,Use this coupon at checkout.,Dùng phiếu này khi thanh toán.,Marketing
loyal,adj,/ˈlɔɪəl/,trung thành,We reward loyal customers.,Chúng tôi tri ân khách hàng thân thiết.,Marketing
purchase,v,/ˈpɜːtʃəs/,mua,Tickets can be purchased online.,Vé có thể mua trực tuyến.,Marketing
retail,adj,/ˈriːteɪl/,bán lẻ,Retail sales rose in December.,Doanh số bán lẻ tăng tháng 12.,Marketing
wholesale,adj,/ˈhəʊlseɪl/,bán sỉ,We sell at wholesale prices.,Chúng tôi bán theo giá sỉ.,Marketing
distributor,n,/dɪˈstrɪbjətə/,nhà phân phối,The distributor supplies 200 stores.,Nhà phân phối cung cấp cho 200 cửa hàng.,Marketing
sales representative,n,/seɪlz ˌreprɪˈzentətɪv/,nhân viên kinh doanh,A sales representative will call you.,Nhân viên kinh doanh sẽ gọi cho bạn.,Marketing
quote,n,/kwəʊt/,báo giá,Could you send us a quote?,Bạn gửi báo giá được không?,Marketing
negotiate,v,/nɪˈɡəʊʃieɪt/,đàm phán,They negotiated a lower price.,Họ đàm phán được giá thấp hơn.,Marketing
deal,n,/diːl/,"thoả thuận, thương vụ",We closed the deal yesterday.,Hôm qua chúng tôi chốt thương vụ.,Marketing
competitive,adj,/kəmˈpetətɪv/,cạnh tranh,Our prices are very competitive.,Giá của chúng tôi rất cạnh tranh.,Marketing
market share,n,/ˈmɑːkɪt ʃeə/,thị phần,The company gained market share.,Công ty tăng thị phần.,Marketing
trend,n,/trend/,xu hướng,Online shopping is a growing trend.,Mua sắm trực tuyến là xu hướng đang lên.,Marketing
feedback,n,/ˈfiːdbæk/,phản hồi,Thank you for your feedback.,Cảm ơn phản hồi của bạn.,Marketing
questionnaire,n,/ˌkwestʃəˈneə/,bảng câu hỏi,Please fill out the questionnaire.,Vui lòng điền bảng câu hỏi.,Marketing
satisfaction,n,/ˌsætɪsˈfækʃn/,sự hài lòng,Customer satisfaction is our goal.,Sự hài lòng của khách là mục tiêu.,Marketing
complaint,n,/kəmˈpleɪnt/,lời phàn nàn,We received a complaint about delays.,Chúng tôi nhận phàn nàn về chậm trễ.,Marketing
exchange,v,/ɪksˈtʃeɪndʒ/,đổi (hàng),You may exchange items within 14 days.,Bạn có thể đổi hàng trong 14 ngày.,Marketing
in stock,phr,/ɪn stɒk/,còn hàng,This model is not in stock.,Mẫu này hiện hết hàng.,Marketing
out of stock,phr,/aʊt əv stɒk/,hết hàng,The item is temporarily out of stock.,Mặt hàng tạm hết.,Marketing
catalog,n,/ˈkætəlɒɡ/,danh mục sản phẩm,Request a free catalog online.,Yêu cầu danh mục miễn phí trên mạng.,Marketing
sponsor,v,/ˈspɒnsə/,tài trợ,The bank sponsors the city marathon.,Ngân hàng tài trợ giải marathon thành phố.,Marketing
endorse,v,/ɪnˈdɔːs/,"chứng thực, quảng bá cho",A famous athlete endorses the shoes.,Một vận động viên nổi tiếng quảng bá cho đôi giày.,Marketing
affordable,adj,/əˈfɔːdəbl/,giá phải chăng,The hotel offers affordable rates.,Khách sạn có giá phải chăng.,Marketing
exclusive,adj,/ɪkˈskluːsɪv/,"độc quyền, dành riêng",Members get exclusive offers.,Thành viên nhận ưu đãi riêng.,Marketing
strategy,n,/ˈstrætədʒi/,chiến lược,We need a new pricing strategy.,Cần chiến lược giá mới.,Marketing
`,
  },
  {
    slug: 'travel',
    title: 'TOEIC 05 · Du lịch, khách sạn & ăn uống',
    description: 'Sân bay, đặt phòng, nhà hàng, sự kiện.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
depart,v,/dɪˈpɑːt/,khởi hành,The flight departs at 7:40.,Chuyến bay khởi hành lúc 7 giờ 40.,Travel
arrival,n,/əˈraɪvl/,sự đến nơi,Arrival time is 10 p.m. local time.,Giờ đến là 10 giờ tối giờ địa phương.,Travel
delay,n,/dɪˈleɪ/,sự chậm trễ,We apologize for the delay.,Xin lỗi vì sự chậm trễ.,Travel
cancel,v,/ˈkænsl/,huỷ,The concert was cancelled due to rain.,Buổi hoà nhạc bị huỷ vì mưa.,Travel
gate,n,/ɡeɪt/,cửa ra máy bay,Please go to gate 12.,Vui lòng đến cửa số 12.,Travel
luggage,n,/ˈlʌɡɪdʒ/,hành lý,Leave your luggage at the front desk.,Để hành lý ở quầy lễ tân.,Travel
carry-on,adj,/ˈkæri ɒn/,xách tay (hành lý),Only one carry-on bag is allowed.,Chỉ được một túi xách tay.,Travel
customs,n,/ˈkʌstəmz/,hải quan,Declare these items at customs.,Khai báo các món này ở hải quan.,Travel
passenger,n,/ˈpæsɪndʒə/,hành khách,Passengers should board now.,Hành khách nên lên máy bay ngay.,Travel
aisle seat,n,/aɪl siːt/,ghế cạnh lối đi,I'd prefer an aisle seat.,Tôi thích ghế cạnh lối đi hơn.,Travel
round-trip,adj,/ˌraʊnd ˈtrɪp/,khứ hồi,A round-trip ticket is cheaper.,Vé khứ hồi rẻ hơn.,Travel
fare,n,/feə/,giá vé,Bus fares will rise next month.,Giá vé xe buýt sẽ tăng tháng sau.,Travel
check in,phr,/tʃek ɪn/,làm thủ tục nhận phòng/lên máy bay,You can check in after 2 p.m.,Bạn có thể nhận phòng sau 2 giờ chiều.,Travel
check out,phr,/tʃek aʊt/,trả phòng,Guests must check out by noon.,Khách phải trả phòng trước trưa.,Travel
reception,n,/rɪˈsepʃn/,quầy lễ tân; tiệc chiêu đãi,A reception will follow the ceremony.,Sau buổi lễ sẽ có tiệc chiêu đãi.,Travel
suite,n,/swiːt/,phòng hạng sang (nhiều gian),The CEO booked a suite.,Giám đốc đặt một phòng suite.,Travel
amenities,n,/əˈmiːnətiz/,tiện nghi,The hotel amenities include a pool.,Tiện nghi khách sạn có hồ bơi.,Travel
complimentary,adj,/ˌkɒmplɪˈmentri/,miễn phí (tặng kèm),Breakfast is complimentary.,Bữa sáng miễn phí.,Travel
front desk,n,/frʌnt desk/,quầy lễ tân,Ask at the front desk for a map.,Hỏi lễ tân để lấy bản đồ.,Travel
book,v,/bʊk/,đặt (chỗ),I booked a table for six.,Tôi đã đặt bàn sáu người.,Travel
venue,n,/ˈvenjuː/,địa điểm tổ chức,The venue holds 500 people.,Địa điểm chứa được 500 người.,Travel
banquet,n,/ˈbæŋkwɪt/,tiệc lớn,The awards banquet is on Friday.,Tiệc trao giải vào thứ Sáu.,Travel
catering,n,/ˈkeɪtərɪŋ/,dịch vụ ăn uống,Who is providing the catering?,Ai cung cấp dịch vụ ăn uống?,Travel
cuisine,n,/kwɪˈziːn/,ẩm thực,The restaurant serves Thai cuisine.,Nhà hàng phục vụ ẩm thực Thái.,Travel
menu,n,/ˈmenjuː/,thực đơn,The lunch menu changes weekly.,Thực đơn trưa đổi hằng tuần.,Travel
appetizer,n,/ˈæpɪtaɪzə/,món khai vị,We ordered two appetizers.,Chúng tôi gọi hai món khai vị.,Travel
beverage,n,/ˈbevərɪdʒ/,đồ uống,Beverages are not included.,Không bao gồm đồ uống.,Travel
bill,n,/bɪl/,hoá đơn,"Could we have the bill, please?",Cho chúng tôi xin hoá đơn.,Travel
tip,n,/tɪp/,tiền boa,A 10 percent tip is customary.,Thường boa 10%.,Travel
chef,n,/ʃef/,đầu bếp,The chef recommends the fish.,Đầu bếp gợi ý món cá.,Travel
dine,v,/daɪn/,dùng bữa,We dined at a seaside restaurant.,Chúng tôi ăn tối ở nhà hàng ven biển.,Travel
tour,n,/tʊə/,chuyến tham quan,The factory tour lasts an hour.,Chuyến tham quan nhà máy kéo dài một giờ.,Travel
sightseeing,n,/ˈsaɪtsiːɪŋ/,ngắm cảnh,We went sightseeing in Kyoto.,Chúng tôi đi ngắm cảnh ở Kyoto.,Travel
destination,n,/ˌdestɪˈneɪʃn/,điểm đến,Bali is a popular destination.,Bali là điểm đến nổi tiếng.,Travel
brochure,n,/ˈbrəʊʃə/,tờ giới thiệu,Take a travel brochure.,Lấy một tờ giới thiệu du lịch.,Travel
admission,n,/ədˈmɪʃn/,vé vào cửa; sự cho vào,Admission is free on Sundays.,Vào cửa miễn phí Chủ nhật.,Travel
exhibition,n,/ˌeksɪˈbɪʃn/,triển lãm,The art exhibition opens today.,Triển lãm nghệ thuật khai mạc hôm nay.,Travel
commute,v,/kəˈmjuːt/,đi làm (hằng ngày),She commutes by train.,Cô ấy đi làm bằng tàu.,Travel
transportation,n,/ˌtrænspɔːˈteɪʃn/,phương tiện đi lại,Public transportation is reliable here.,Giao thông công cộng ở đây đáng tin cậy.,Travel
directions,n,/dəˈrekʃnz/,chỉ đường,Can you give me directions to the station?,Bạn chỉ đường đến ga được không?,Travel
`,
  },
  {
    slug: 'operations',
    title: 'TOEIC 06 · Sản xuất, vận chuyển & mua hàng',
    description: 'Nhà máy, kho, đặt hàng, giao hàng, hợp đồng nhà cung cấp.',
    csv: `term,pos,reading,meaningVi,example,exampleVi,topic
manufacture,v,/ˌmænjuˈfæktʃə/,sản xuất,The plant manufactures car parts.,Nhà máy sản xuất linh kiện ô tô.,Operations
factory,n,/ˈfæktri/,nhà máy,The factory runs 24 hours a day.,Nhà máy chạy 24 giờ mỗi ngày.,Operations
assembly line,n,/əˈsembli laɪn/,dây chuyền lắp ráp,Workers on the assembly line wear gloves.,Công nhân dây chuyền đeo găng tay.,Operations
equipment,n,/ɪˈkwɪpmənt/,thiết bị,New equipment arrives next week.,Thiết bị mới đến tuần sau.,Operations
machinery,n,/məˈʃiːnəri/,máy móc,The machinery needs regular checks.,Máy móc cần kiểm tra định kỳ.,Operations
operate,v,/ˈɒpəreɪt/,vận hành,Only trained staff may operate the crane.,Chỉ người được đào tạo mới vận hành cần cẩu.,Operations
output,n,/ˈaʊtpʊt/,sản lượng,Output rose by 12 percent.,Sản lượng tăng 12%.,Operations
quality control,n,/ˈkwɒləti kənˈtrəʊl/,kiểm soát chất lượng,Quality control found no defects.,Kiểm soát chất lượng không thấy lỗi.,Operations
defect,n,/ˈdiːfekt/,"lỗi, khuyết tật",Each defect is recorded.,Mỗi lỗi đều được ghi lại.,Operations
inspect,v,/ɪnˈspekt/,kiểm tra,Inspectors will inspect the site.,Thanh tra sẽ kiểm tra công trường.,Operations
safety regulations,n,/ˈseɪfti ˌreɡjuˈleɪʃnz/,quy định an toàn,Follow all safety regulations.,Tuân thủ mọi quy định an toàn.,Operations
warehouse,n,/ˈweəhaʊs/,nhà kho,The goods are stored in the warehouse.,Hàng được cất trong kho.,Operations
stock,v,/stɒk/,nhập/trữ hàng,We stock over 500 items.,Chúng tôi trữ hơn 500 mặt hàng.,Operations
supplier,n,/səˈplaɪə/,nhà cung cấp,We changed suppliers last year.,Năm ngoái chúng tôi đổi nhà cung cấp.,Operations
vendor,n,/ˈvendə/,"người bán, nhà cung cấp",Each vendor must register.,Mỗi nhà cung cấp phải đăng ký.,Operations
order,v,/ˈɔːdə/,đặt hàng,I ordered 200 boxes of paper.,Tôi đã đặt 200 thùng giấy.,Operations
purchase order,n,/ˈpɜːtʃəs ˈɔːdə/,đơn đặt hàng,Attach the purchase order number.,Ghi kèm số đơn đặt hàng.,Operations
bulk,n,/bʌlk/,số lượng lớn,Buying in bulk saves money.,Mua số lượng lớn tiết kiệm tiền.,Operations
deliver,v,/dɪˈlɪvə/,giao hàng,We deliver within two days.,Chúng tôi giao trong hai ngày.,Operations
delivery,n,/dɪˈlɪvəri/,sự giao hàng,Delivery is free over $50.,Miễn phí giao hàng cho đơn trên 50 đô.,Operations
ship,v,/ʃɪp/,gửi hàng,Your order was shipped today.,Đơn của bạn đã được gửi hôm nay.,Operations
freight,n,/freɪt/,hàng hoá vận chuyển; cước,Freight costs have doubled.,Cước vận chuyển đã tăng gấp đôi.,Operations
package,n,/ˈpækɪdʒ/,kiện hàng,A package arrived for you.,Có một kiện hàng gửi bạn.,Operations
tracking number,n,/ˈtrækɪŋ ˈnʌmbə/,mã vận đơn,Use the tracking number to check status.,Dùng mã vận đơn để xem trạng thái.,Operations
logistics,n,/ləˈdʒɪstɪks/,"hậu cần, logistics",She manages logistics for the event.,Cô ấy lo hậu cần cho sự kiện.,Operations
dispatch,v,/dɪˈspætʃ/,"gửi đi, điều phối",The parts were dispatched by air.,Linh kiện được gửi bằng đường hàng không.,Operations
courier,n,/ˈkʊriə/,dịch vụ chuyển phát,Send the documents by courier.,Gửi giấy tờ qua chuyển phát.,Operations
fragile,adj,/ˈfrædʒaɪl/,dễ vỡ,Mark the box as fragile.,Ghi chú thùng hàng dễ vỡ.,Operations
damaged,adj,/ˈdæmɪdʒd/,bị hư hỏng,Two items arrived damaged.,Hai món đến nơi bị hỏng.,Operations
replace,v,/rɪˈpleɪs/,thay thế,We will replace the faulty unit.,Chúng tôi sẽ thay thiết bị lỗi.,Operations
specification,n,/ˌspesɪfɪˈkeɪʃn/,thông số kỹ thuật,Check the specifications before ordering.,Kiểm tra thông số trước khi đặt.,Operations
prototype,n,/ˈprəʊtətaɪp/,mẫu thử,The prototype will be tested in May.,Mẫu thử sẽ được thử nghiệm tháng Năm.,Operations
efficient,adj,/ɪˈfɪʃnt/,hiệu quả,The new process is more efficient.,Quy trình mới hiệu quả hơn.,Operations
capacity,n,/kəˈpæsəti/,công suất; sức chứa,The plant is at full capacity.,Nhà máy chạy hết công suất.,Operations
component,n,/kəmˈpəʊnənt/,"linh kiện, thành phần",Some components come from Korea.,Một số linh kiện đến từ Hàn Quốc.,Operations
install,v,/ɪnˈstɔːl/,lắp đặt,Technicians installed the new system.,Kỹ thuật viên đã lắp hệ thống mới.,Operations
upgrade,v,/ʌpˈɡreɪd/,nâng cấp,We upgraded the software last night.,Đêm qua chúng tôi nâng cấp phần mềm.,Operations
malfunction,n,/mælˈfʌŋkʃn/,sự trục trặc,A malfunction stopped production.,Một trục trặc làm ngưng sản xuất.,Operations
procedure,n,/prəˈsiːdʒə/,"quy trình, thủ tục",Follow the emergency procedure.,Làm theo quy trình khẩn cấp.,Operations
on schedule,phr,/ɒn ˈʃedjuːl/,đúng tiến độ,The project is on schedule.,Dự án đang đúng tiến độ.,Operations
`,
  },
]
