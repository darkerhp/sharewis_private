import React from 'react';
import ReactNative from 'react-native';

import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import * as localeUtil from '../../utils/locale';

const { StyleSheet, View, WebView } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: BaseStyles.navbarHeight
  }
});

// FIXME htmlファイルをrequireすると化けるのでとりあえず文字列
// eslint-disable-next-line
const ja = '<h1>プライバシーポリシー</h1><p>株式会社シェアウィズ（以下「当社」といいます。）の提供するShareWis（シェアウィズ）における，ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。</p><h2>第1条 定義</h2><p>本ポリシーにおいて使用する以下の用語は各々以下に定める意味を有するものとします。</p><ol><li>「学習者」とは、本サービスの学習者としての登録がなされた個人又は法人を意味します。</li><li>「講師」とは、本サービスの講師としての登録がなされた個人又は法人を意味します。</li><li>「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、又はそれらの権利につき登録等を出願する権利を含む。）を意味します。</li><li>「当社ウェブサイト」とは、そのドメインが「share-wis.com」である当社が運営するウェブサイト（理由の如何を問わず当社のウェブサイトのドメイン又は内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。</li><li>「本サービス」とは、当社が提供するShareWis（シェアウィズ）という名称の学習サイトのサービスを意味し，当社が講師から提供を受けたレクチャーコンテンツを，当社が学習者に有償または無償で提供すること等をその内容とします（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。）。</li><li>「本サービス利用契約（学習者）」とは、当社と学習者の間で成立する、本規約の諸規定に従った本サービスの利用契約を意味します。</li><li>「レクチャーコンテンツ」とは，学習者に提供するために，当社が講師から提供を受けるコンテンツ（文章，画像，動画その他データを含むが，これらに限らない）を意味します。</li></ol><h2>第2条 収集する利用者情報及び収集方法</h2><p>ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーのスマートフォン、ＰＣ等の端末においてユーザー又はユーザーの端末に関連して生成又は蓄積された情報であって、本ポリシーに基づき当社が収集するものを意味するものとします。本サービスにおいて当社が収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。<br> (1) ユーザーからご提供いただく情報 ユーザーが本サービスを利用するために、ご提供いただく情報は以下のとおりです。<br> ア 学習者からご提供いただく情報</p><ul><li>メールアドレス</li><li>その他当社が定める入カフォームにユーザーが入力する情報（アカウント名及びプロフィール文）</li></ul><p> イ 講師からご提供頂く情報</p><ul><li>氏名</li><li>住所</li><li>メールアドレス</li><li>銀行口座</li><li>その他当社が定める入カフォームにユーザーが入力する情報（アカウント名及びプロフィール文）</li></ul><p> (2) ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報<br> ユーザーが、本サービスを利用するにあたり、ソーシャルネットワークサービス等の外部サービスとの連携を許可した場合には、その許可の際にご同意いただいた内容に基づき、以下の情報を当該外部サービスから収集します。</p><ul><li>当該外部サービスでユーザーが利用するID</li><li>その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報<br> </li></ul><p>(3) ユーザーが本サービスを利用するにあたって、当社が収集する情報 当社は、本サービスへのアクセス状況やそのご利用方法に関する情報を収集することがあります。これには以下の情報が含まれます。</p><ul><li>端末情報</li><li>ログ情報</li><li>Cookie及び匿名ID</li></ul><h2>第3条 利用目的</h2><p>本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。<br> </p><ol><li>本サービスに関する登録の受付、本人確認、利用料金の計算等本サービスの提供、維持、保護及び改善のため</li><li>本サービスに関するご案内、お問い合せ等への対応のため</li><li>本サービスに関する当社の規約、ポリシー等（以下「規約等」といいます。)に違反する行為に対する対応のため</li><li>本サービスに関する規約等の変更などを通知するため</li><li>当社または第三者の広告の配信又は表示のため</li><li>上記の利用目的に付随する利用目的のため</li></ol><h2>第4条 利用中止要請の方法</h2><p>ユーザーは、本サービスの所定の設定を行うことにより、利用者情報の全部又は一部についてその利用の停止を求めることができ、この場合、当社は速やかに、当社の定めるところに従い、その利用を停止します。なお利用者情報の項目によっては、その収集又は利用が本サーヒスの前提となるため、当社所定の方法により本サービスを退会した場合に限り、当社はその収集を停止します。</p><h2>第5条 第三者提供</h2><p>1 当社は、利用者情報のうち、以下の個人情報を第三者に提供いたします。</p><ol><li>学習者の個人情報のうち，講師に提供するもの なし<br> </li><li>講師の個人情報のうち，学習者に提供するもの 氏名<br> </li></ol><p>2 上記以外の個人情報については、個人情報保護法その他の法令に基づき開示が認められる場台を除くほか、あらかじめユーザーの同意を得ないで、第三者に提供しません。但し、次に掲げる場合はこの限りではありません。</p><ol><li>当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託する場合<br> </li><li>合併その他の事由による事業の承継に伴って個人情報が提供される場合<br> </li><li>第4項の定めに従って、情報収集モジュール提供者へ個人情報が提供される場合<br> </li><li>国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合<br> </li><li>その他、個人情報保護法その他の法令で認められる場合</li></ol><h2>第6条 個人情報の開示</h2><p>当社は、ユーザーから、個人情報保護法の定めに基づき個人情報の開示を求められたときは、ユーザーご本人からのご請求であることを確認の上で、ユーザーに対し、遅滞なく開示を行います(当該個人惰報が存在しないときにはその旨を通知いたします。)。但し、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、この限りではありません。なお、個人情報の開示につきましては、手数料(1件あたり1,000円)を頂戴しておりますので、あらかじめ御了承ください。</p><h2>第7条 個人情報の訂正及び利用停止等</h2><p>1 当社は、ユーザーから、</p><ol><li>個人情報が真実でないという理由によって個人情報保護法の定めに基づきその内容の訂正を求められた場合、及び<br> </li><li>あらかじめ公表された利用目的の範囲を超えて取り扱われているという理由又は偽りその他不正の手段により収集されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止を求められた場合には、ユーザーご本人からのご請求であることを確認の上で遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正または利用停止を行い、その旨をユーザーに通知します。なお、合理的な理由に基づいて訂正または利用停止を行わない旨の決定をしたときは、ユーザーに対しその旨を通知いたします。<br> </li></ol><p>2 当社は、ユーザーから、ユーザーの個人情報について消去を求められた場合、当社が当該請求に応じる必要があると判断した場合は、ユーザーご本人からのご請求であることを確認の上で、個人情報の消去を行い、その旨をユーザーに通知します。<br>3 個人情報保護法その他の法令により、当社が訂正等または利用停止等の義務を負わない場合は、前2項の規定は適用されません。</p><h2>第8条 お問い合わせ窓ロ</h2><p>ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、下記の窓口までお願い致します。<br> 住所：大阪市中央区南久宝寺町3−2−7 第一住建南久宝寺町ビル402号<br> 株式会社シェアウィズ 担当者：辻川友紀<br> E-mail：support@share-wis.com</p><h2>第9条 プライバシーポリシーの変更手続</h2><p>当社は、利用者情報の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、本ポリシーを変更することがあります。変更した場合には、本サービスの規約等に定める方法でユーザーに通知いたします。但し、法令上ユーザーの同意が必要となるような内容の変更の場合は、当社所定の方法でユーザーの同意を得るものとします。</p>';
// eslint-disable-next-line
const en = '<h1>Privacy Policy</h1><p>We, ShareWis Inc. (hereinafter collectively called as “ShareWis” or “the Company” on behalf of ShareWis Inc. and its affiliates), have established the privacy policy of our service, ShareWis (hereinafter called as “this policy”), to protect the individual’s rights and interests.</p><h2>Article 1. Definition</h2><p>The following words and terms used in this privacy policy shall have the following meanings:</p><ol><li>“Learner” shall mean a user who have signed up to ShareWis.</li><li>“Instructor” shall mean a user who have been registred as an instructor to ShareWis.</li><li>"User" shall mean any individual or corporation that has been registered as a User of the Services.</li><li>"Service" shall mean the service of a learning site named ShareWis and created by the Company, the details of which is that the Company provides the Lecture Content, which is provided by the Lecturer, to Users for a fee.</li><li>"Lecture Content" shall mean any contents created and provided by the Instructor to the Company in order for the Company to provide with Users (including but not limited to text, images, videos and other data).</li></ol><h2>Article 2. Personal Information to be Collected and Method of Collection</h2><p>The term “Personal Information” means information that identifies users, history of actions on communication services and other information created or accumulated in relation to user or users’ devices.<br> Depending on the method of collection, the Personal Information that we may collect for a user to use the Services includes:<br>(1) Personal Information provided by a user, including:<br> A. Personal information provided by a learner</p><ul><li>Email address</li><li>Other information provided by a user in forms on ShareWis, such as account name, bio etc.</li></ul><p>B. Personal information provided by an instructor</p><ul><li>Name</li><li>Address</li><li>Email address</li><li>Bank account information</li><li>Other information provided by a user in forms on ShareWis, such as account name, bio etc.</li></ul><p>(2) Personal Information provided from the third party services outside ShareWis to the extent that the user permits for use;<br> We may collect the following information from the third party services outside the ShareWis, including but not limited to social network services, to the extent the user permits;</p><ul><li>ID on the third pary services</li><li>Other information that the user has authorized the third party service provider to disclose through its privacy settings</li></ul><p>(3) Personal Information collected through the use of ShareWis<br> We may collect information upon access to or use of ShareWis, including;</p><ul><li>Device information</li><li>Access log</li><li>Cookies and anonymous ID</li></ul><h2>Article 3. Purposes for Using Personal Information</h2><p>We use Personal Information for the following purposes.</p><ol><li>Provision, maintenance, protection, and improvement of the service, including but not limited to acceptance of the registration and identification of individuals</li><li>Guidance or response to inquiries</li><li>Addressing a violation of rules, regulations or policies</li><li>Notifications of any modification to the rules</li><li>Advertisement</li><li>Purposes incidental to the purposes of use above</li></ol><h2>Article 4. Method of Discontinuance of the Use</h2><p>If a user specifies a certain setting, the user is entitled to require us to, and we shall immediately, discontinue the use of any or all of user’s Personal Information. Depending on the item of the Personal Information, if such collection or use is required for ShareWis, we may not be able to discontinue such collection unless the user withdraws from ShareWis pursuant to the procedures as determined by us.</p><h2>Article 5. Provision of Personal Information to Third Parties</h2><p>1 We will provide user’s personal information to the following cases;</p><ol><li>Learner’s personal information to an instructor: Nothing</li><li>Instructor’s personal information to a learner: Name</li></ol><p>2 We will not provide user’s personal information to third parties without user’s prior agreement, except in the following cases. However, it excludes cases in which it is admitted by Personal Information Protection Law and other laws and regulations.</p><ol><li>Cases in which we entrust with handling the personal information in a whole or in part within the scope necessary for the achievement of the purpose of the use</li><li>Cases in which personal information is provided as a result of the succession of business in a merger or otherwise<br> </li><li>Cases in which personal information is provided to a provider of an information collection module pursuant to Section 4<br> </li><li>Cases in which it is necessary to cooperate with a state organ, a local government, or individual entrusted by either of the former two in executing the operation prescribed by laws and regulations, and in which obtaining the consent of the person might impede the execution of the operation concerned<br> </li><li>Cases in which it is based on laws and regulations</li></ol><h2>Article 6. Disclosure of Personal Information</h2><p>When we are requested by a person to disclose the retained personal information, we will disclose the personal information concerned to the person without delay. However, in any of the following cases, we may keep all or part of the retained personal data undisclosed, and the person will be notified thereof. Meanwhile, a ¥1,000 handling fee will be charged per disclosure of personal information.</p><h2>Article 7. Correction and Suspension of Retained Personal Information</h2><p>1 We will correct or suspend a personal information in the following cases;</p><ol><li>A user may request us to correct his/her personal information by procedures specified by ShareWis when the retained personal information is incorrect.<br> </li><li>When we are requested by a user to discontinue using or erase (hereinafter called as, to implement “discontinuance of the use etc.”) the retained personal information on the ground that the personal information is being handled beyond the scope of use purpose, or has been acquired by wrongful means, we will conduct the necessary investigation, and based on the result, we will implement the discontinuance of the use etc. of the personal information and notify the person. However, cases in which it costs large amount or is difficult to discontinue using or to erase the retained personal information, and in which it is found possible to take necessary alternative measures to protect the rights and interests of the person, we will take the measures.<br> </li></ol><p>2 When we receive user’s request set forth in preceding paragraph and deems it necessary to accept the request, we will correct or delete the retained personal information without delay, and notify the user.<br>3&nbsp;We should not be obligated to correct, or suspend use of, information pursuant to the Personal Information Protection Act and other applicable laws and regulations, the preceding paragraphs shall not apply.</p><h2>Article 8. Contact for Inquiries</h2><p>Please contact the receptionist below for any questions and comments.<br> Address: 3−2−7, Minamikyuhojimachi, Chuo-ku, Osaka-shi, Osaka, Japan<br> E-mail：support@share-wis.com</p><h2>Article 9. Privacy Policy Changes</h2><p>The contents of this policy may be changed. In case of major update, we will notice our customers in appropriate places and/or by appropriate means. In case of any updates which legally require an agreement from a user, we will ask users’ agreement on the change.</p>';

const Privacy = () => (
  <View style={styles.container}>
    <WebView
      source={{ html: localeUtil.isJa() ? ja : en }}
      style={{ width: BaseStyles.deviceWidth }}
    />
  </View>
);

export default Privacy;
