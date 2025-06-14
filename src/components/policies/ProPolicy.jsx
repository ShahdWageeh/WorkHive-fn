import React from 'react'

export default function ProPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">سياسة المحترفين</h1>
      
      <div className="space-y-8">
        {/* Registration & Approval */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. التسجيل والموافقة</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>يجب على المحترفين التقديم من خلال المنصة وتقديم بطاقة هوية سارية، ووثائق خبرة، وشهادات (إن وجدت).</li>
            <li>فقط المحترفين الذين يتم التحقق منهم والموافقة عليهم من قبل فريق الإدارة سيستلمون طلبات العمل.</li>
          </ul>
        </section>

        {/* Service Commitment */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. الالتزام بالخدمة</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>يجب على المحترفين الالتزام بالحجوزات المؤكدة والوصول في الوقت المحدد.</li>
            <li>في حال التأخر أو عدم القدرة على الحضور، يجب على المحترف إبلاغ العميل والمنصة في أقرب وقت ممكن.</li>
          </ul>
        </section>

        {/* Inspection & Reporting */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. المعاينة والإبلاغ</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>خلال المعاينة، يجب على المحترفين تقديم تشخيص واضح للمشكلة.</li>
            <li>إذا تم اكتشاف مشكلات إضافية، يجب على المحترف إبلاغ العميل وإدارة Workhive من خلال المنصة للحصول على الموافقة.</li>
          </ul>
        </section>

        {/* Payment Handling */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. إدارة المدفوعات</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>سيحصل المحترفون على مستحقاتهم وفقًا لطريقة الدفع المحددة وجدول صرف الأرباح الخاص بالمنصة.</li>
            <li>ستقوم Workhive بخصم عمولتها حسب اتفاقية العقد.</li>
          </ul>
        </section>

        {/* Conduct & Quality */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">5. السلوك وجودة العمل</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>يجب على المحترفين التحلي بالاحترافية ومعاملة العملاء باحترام.</li>
            <li>التقييمات المنخفضة، أو الشكاوى المتكررة، أو سوء السلوك قد تؤدي إلى الإيقاف أو الحذف الدائم من المنصة.</li>
          </ul>
        </section>

        {/* Schedule Management */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">6. إدارة الجدول الزمني</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>تقع مسؤولية تحديث التوفر الزمني بدقة على عاتق المحترفين.</li>
            <li>المواعيد الفائتة المتكررة دون إخطار ستؤدي إلى فرض غرامات.</li>
          </ul>
        </section>

        {/* External Dealing Clause */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">7. بند التعاملات الخارجية</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>يُمنع تمامًا أي تعامل مباشر بين العملاء والمحترفين خارج منصة Workhive. في حال حدوث مثل هذه التفاعلات غير المصرح بها، فإن Workhive لا تتحمل أي مسؤولية عن النتائج أو جودة أو سلامة العمل المُنفذ. ويجوز اتخاذ إجراءات قانونية ضد المحترف المخالف بسبب خرقه لسياسة المنصة.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
