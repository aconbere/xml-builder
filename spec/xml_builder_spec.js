Screw.Unit(function() {
    describe("xml.escape", function() {
        it("should replace & with &amp;", function() {
            expect(xml.escape("&")).to(equal, "&amp;");
        });
        it("should replace < with &lt;", function() {
            expect(xml.escape("<")).to(equal, "&lt;");
        });
        it("should replace > with &gt;", function() {
            expect(xml.escape(">")).to(equal, "&gt;");
        });
    });

    describe("xml.build", function() {
        it("should create an xml element", function() {
            expect(xml.build("head").tagName).to(equal, "HEAD");
        });

        describe("when given an attrs hash", function() {
            it("should assign those attributes to the element", function(){
                expect(xml.build("head", {x: "10"}).getAttribute("x")).to(equal, "10");
            });
        });

    });
    describe("xml.text", function() {
        it("should return a new text node", function() {
            expect(xml.text("inner").wholeText).to(equal, "inner");
        });
    });

    describe("xml", function() {
        it("should build a nested xml fragment", function() {
            el = xml("iq", {x: "y"}, function(){
                this.xml("query", {}, function() {
                    this.text("blah");
                });
            });
            expect(el.tagName).to(equal, "IQ");
            expect(el.children[0].tagName).to(equal, "QUERY");
            expect(el.children[0].textContent).to(equal, "blah");
        });
    });
});
