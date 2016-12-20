import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import Lecture from '../../models/Lecture';
import BaseStyles from '../../baseStyles';

const {
  StyleSheet,
  Text,
  View,
  WebView,
} = ReactNative;

const styles = StyleSheet.create({
  webViewWrapper: { flex: 9 },
  webView: {},
  lectureTitleTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lectureTitle: {
    fontSize: 17,
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
});

const TextLecture = ({ currentLecture, lectureContentStyleId }) => {

  // TODO DEBUG
  currentLecture = currentLecture.set('body', '<p>このコースで解説した内容をまとめました。<br>是非、これらのコミュニケーション術を身につけて、相手との会話をはずませましょう！</p><p><br></p><h3>話し方のポイント</h3><p>職場の男性やご主人とお話していて『要するに何が言いたいの』とか『話がわかりにくい-』と言われたことないですか？</p><p>男性にとっては一生懸命聞こうと思えば思うほど、きつい言葉の反応になりがちです。<br><span style="line-height: 1.45em;">もともと男性と女性の脳の構造の違いからコミュニケーションの仕方に差がでてくるんで-すね。</span></p><p>そんなコミュニケーション、ちょっと話す順番を変えてみるのはいかがでしょうか？</p><p>話し方のポイントとして、<b><font color="#fc0c59">結論からお話をしてみる</font></b>のも１つの方法です。</p><p>普段と話す順番をかえることで上手に相手に伝えられることがあります。</p><p><br></p><h3>会話のはひふへほ</h3><p>会話は、自分が話しているだけじゃないですよね。<br><p><span style="line-height: 1.45em;">相手の話を聞いて、相手も聞いてもらっている実感があると、さらに会話がはずみます。</span></p></p><p>会話がはずむコツ、「会話のはひふへほ」を試してみましょう。</p><p><br></p><p><b><font color="#fc0c59">は</font></b>ぁ～なるほど！</p><p><b><font color="#fc0c59">ふ</font></b>ーんそうなんだ～</p><p><b><font color="#fc0c59">へ</font></b>ぇーすごいねー！</p><p><b><font color="#fc0c59">ほ</font></b>ぉ～それでそれで！</p><p><br></p><h3>「すもも」でアドバイス</h3><p>ほめて伸ばそう！</p><p>口うるさくアドバイスしちゃう時ってないですか？</p><p>ほめ方って具体的にどうしたらいいかよくわからないって事はありませんか？</p><p>そんな時は、次の「すもも」をキーワードに褒めてアドバイスをしてみましょう。</p><p><br></p><p><b><font color="#fc0c59">す</font></b>ごく、いいね！</p><p><b><font color="#fc0c59">も</font></b>ったいないのは…</p><p><b><font color="#fc0c59">も</font></b>のすごくよかったのはこれだね！</p>');

  return (
    <View style={[lectureContentStyleId, { marginTop: BaseStyles.navbarHeight }]}>
      <View style={styles.lectureTitleTextWrapper}>
        <Text style={styles.lectureTitle}>{currentLecture.title}</Text>
      </View>
      <View style={styles.webViewWrapper}>
        <WebView
          style={styles.webView}
          source={{ html: currentLecture.body }}
        />
      </View>
    </View>
  );
};

TextLecture.propTypes = {
  currentLecture: PropTypes.instanceOf(Lecture).isRequired,
  lectureContentStyleId: PropTypes.number.isRequired,
};

export default TextLecture;
