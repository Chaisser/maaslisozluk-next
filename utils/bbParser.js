import parser, { Tag } from "bbcode-to-react";
import Spoiler from "./../components/Spoiler";
import PostLink from "./../components/PostLink";
import PostRefer from "./../components/PostRefer";
import PostSecret from "./../components/PostSecret";
import PlainText from "./../components/PlainText";

class GizliTag extends Tag {
  toReact() {
    return <PostSecret text={this.getContent(true)} />;
  }
}

class SpoilerTag extends Tag {
  toReact() {
    return <Spoiler text={this.getContent(true)} />;
  }
}

class LinkTag extends Tag {
  toReact() {
    return <PostLink text={this.getContent(true)} />;
  }
}

class ReferTag extends Tag {
  toReact() {
    return <PostRefer text={this.getContent(true)} />;
  }
}

class OtherTag extends Tag {
  toReact() {
    return <PlainText text={this.getContent(true)} />;
  }
}

parser.registerTag("gizli", GizliTag);
parser.registerTag("link", LinkTag);
parser.registerTag("spoiler", SpoilerTag);
parser.registerTag("bkz", ReferTag);
parser.registerTag("img", OtherTag);
parser.registerTag("b", OtherTag);
parser.registerTag("i", OtherTag);
parser.registerTag("u", OtherTag);
parser.registerTag("s", OtherTag);
parser.registerTag("h1", OtherTag);
parser.registerTag("h2", OtherTag);
parser.registerTag("h3", OtherTag);
parser.registerTag("h4", OtherTag);
parser.registerTag("h5", OtherTag);
parser.registerTag("h6", OtherTag);

parser.registerTag("pre", OtherTag);
parser.registerTag("table", OtherTag);
parser.registerTag("thead", OtherTag);
parser.registerTag("tbody", OtherTag);
parser.registerTag("tr", OtherTag);
parser.registerTag("th", OtherTag);
parser.registerTag("td", OtherTag);
parser.registerTag("code", OtherTag);
parser.registerTag("hr", OtherTag);
parser.registerTag("size", OtherTag);
parser.registerTag("center", OtherTag);
parser.registerTag("right", OtherTag);
parser.registerTag("color", OtherTag);
parser.registerTag("list", OtherTag);
parser.registerTag("*", OtherTag);
parser.registerTag("quote", OtherTag);
parser.registerTag("url", OtherTag);
parser.registerTag("email", OtherTag);

export default parser;
