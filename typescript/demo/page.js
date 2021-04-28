var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var ele = document.createElement('div');
            ele.innerText = 'this is header';
            document.body.appendChild(ele);
        }
        return Header;
    }());
    var Content = /** @class */ (function () {
        function Content() {
            var ele = document.createElement('div');
            ele.innerText = 'this is content';
            document.body.appendChild(ele);
        }
        return Content;
    }());
    var Footer = /** @class */ (function () {
        function Footer() {
            var ele = document.createElement('div');
            ele.innerText = 'this is footer';
            document.body.appendChild(ele);
        }
        return Footer;
    }());
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
            new Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
