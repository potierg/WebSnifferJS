var http = require('http');

module.exports = function () {

    this.htmlObject = {};

    this.clean = function () {
        this.htmlObject = {};
    }

    this.clean_line = function (line) {
        if (!line) return line;
        while (line.indexOf("  ") !== -1) {
            line = line.replace("  ", " ");
        }
        return (line.replace("\t", "").replace("\r", "").trim());
    }

    this.parseWithLink = function (url = "", callback) {
        let content = "";

        http.get(url, (resp) => {
            resp.setEncoding("utf8");
            resp.on("data", function (chunk) {
                content += chunk;
            });

            var t = this;
            resp.on("end", function () {
                content = content.replace("\n", "").replace("\r", "");
                content = content.substring(content.indexOf("<html"));
                t.htmlObject = t.parseHtml(t.clean_line(content));

                callback(t.htmlObject);
            });
        });

    }

    this.parseWithFile = function (HTMLContent = "", callback) {
        var html = this.clean_line(HTMLContent.replace("\n", "").replace("\r", ""));
        html = html.substring(html.indexOf("<html"));
        this.htmlObject = this.parseHtml(this.clean_line(html));

        callback(this.htmlObject);
    }

    this.formatTable = function (obj) {

        let array_head = [];
        let obj_body = [];

        if (obj[0] && obj[0].name == "thead" && obj[0].next && obj[0].next[0] && obj[0].next[0].next) {
            for (let head_id in obj[0].next[0].next)
                array_head.push(obj[0].next[0].next[head_id].value);
        }

        if (obj[1] && obj[1].name == "tbody" && obj[1].next) {

            for (let body_id in obj[1].next) {
                let body_part = obj[1].next[body_id];
                let obj_part = {};

                if (body_part.next) {
                    for (let elem_id in body_part.next) {
                        obj_part[array_head[elem_id]] = body_part.next[elem_id].value;
                    }

                    obj_body.push(obj_part);
                }
            }
        }

        if (obj[0] && obj[0].name == "div" && obj[0].content.indexOf("class=\"thead\"") !== -1) {
            for (let head_id in obj[0].next)
                array_head.push(obj[0].next[head_id].value);

            for (let body_id = 1; body_id < obj.length; body_id++) {
                let body_part = obj[body_id];
                let obj_part = {};

                if (body_part.next) {
                    for (let elem_id in body_part.next) {
                        obj_part[array_head[elem_id]] = body_part.next[elem_id].value;
                    }

                    obj_body.push(obj_part);
                }
            }
        }

        return obj_body;
    }

    this.readSearchLine = function (line) {
        var search_object = [];

        let tmp_search_obj = line.split(";");

        for (let s in tmp_search_obj) {
            let tmp_s = tmp_search_obj[s];
            let tmp_s_obj = tmp_s.split("|");

            if (tmp_s_obj.length > 0) {
                let new_obj = { balise: tmp_s_obj[0] };

                if (tmp_s_obj.length == 3 || (tmp_s_obj.length == 2 && tmp_s_obj[1].indexOf("[") !== -1 && tmp_s_obj[1].indexOf("]") !== -1)) {
                    let content = tmp_s_obj[1].slice(tmp_s_obj[1].indexOf("[") + 1, tmp_s_obj[1].indexOf("]"))
                    new_obj["content"] = content.split(",");
                }

                if (tmp_s_obj.length == 3 && tmp_s_obj[2].indexOf("{") !== -1 && tmp_s_obj[2].indexOf("}") !== -1) {
                    new_obj["position"] = parseInt(tmp_s_obj[2].slice(tmp_s_obj[2].indexOf("{") + 1, tmp_s_obj[2].indexOf("}")));
                }

                if (tmp_s_obj.length == 2 && tmp_s_obj[1].indexOf("{") !== -1 && tmp_s_obj[1].indexOf("}") !== -1) {
                    new_obj["position"] = parseInt(tmp_s_obj[1].slice(tmp_s_obj[1].indexOf("{") + 1, tmp_s_obj[1].indexOf("}")));
                }

                search_object.push(new_obj);
            }
        }

        return search_object;
    }

    this.execSearchFromObj = function (obj = {}, searchArray = {}) {

        browseObj = obj;

        for (let id in searchArray) {
            let s_obj_search = searchArray[id];

            let final_pos = 0;
            if (s_obj_search.position)
                final_pos = s_obj_search.position;

            let cpt_pos = -1;

            for (let current_obj_id in browseObj) {

                let current_browse_obj = browseObj[current_obj_id];

                if (!current_browse_obj)
                    break;

                if (s_obj_search.balise == current_browse_obj.name) {
                    if (s_obj_search.content) {

                        let cpt_match = 0;

                        for (let m_id in s_obj_search.content) {
                            for (let m_id2 in current_browse_obj.content) {
                                if (s_obj_search.content[m_id] == current_browse_obj.content[m_id2]) {
                                    cpt_match++;
                                    break;
                                }
                            }
                        }

                        if (cpt_match == s_obj_search.content.length) {
                            cpt_pos++;
                        }
                    }
                    else
                        cpt_pos++;
                }

                if (cpt_pos == final_pos) {
                    browseObj = browseObj[current_obj_id].next;
                    break;
                }
            }
            if (cpt_pos != final_pos)
                return false;
        }
        return browseObj;
    }

    this.recusrsiveBrowseObjectSearch = function (object = {}, searchArray = []) {
        let good_obj;

        for (let i_obj in object) {
            let n_obj = object[i_obj];

            let ret = this.execSearchFromObj([n_obj], searchArray);
            if (ret !== false)
                return ret;

            if (n_obj.next) {
                good_obj = this.recusrsiveBrowseObjectSearch(n_obj.next, searchArray);
                if (good_obj !== false)
                    return good_obj;
            }
        }
        return false;
    }

    this.search = function (searchString = "") {
        var search_object = this.readSearchLine(searchString);
        var result_search = this.recusrsiveBrowseObjectSearch(this.htmlObject, search_object);
        return result_search;
    }

    this.parseHtml = function (html = "", loop = 0) {
        let indexHtml = 0;
        html = this.clean_line(html);
        let content = [];

        if (loop < 0 || html.length <= 0)
            return null;

        if (html.indexOf("<") === -1)
            return null;

        html = html.slice(html.indexOf("<"));
        
        while (html.indexOf("<!--") === 0) {
            html = html.slice(html.indexOf("-->") + 3);
        }

        html = html.slice(html.indexOf("<"));

        while (html.indexOf("<script") === 0) {
            html = html.slice(html.indexOf("</script>") + 9);
            html = html.slice(html.indexOf("<"));
        }

        let firstBaliseInfo = this.getBaliseInfo(html);
        if (firstBaliseInfo.index == -1)
            return;

        let start_pos = firstBaliseInfo.index;
        let lastBaliseInfo = 0;
        if (firstBaliseInfo.balise.name != "script") {
            if (firstBaliseInfo.balise.is_end == false) {
                lastBaliseInfo = this.getPosEndOfBalise(html, firstBaliseInfo);
                start_pos = lastBaliseInfo + 3 + firstBaliseInfo.balise.name.length;

                let tmp = html.slice(firstBaliseInfo.index + 1, lastBaliseInfo);

                if (this.getBaliseInfo(tmp).index == -1)
                    firstBaliseInfo.balise["value"] = tmp;

                firstBaliseInfo.balise["next"] = this.parseHtml(tmp, loop + 1);

                content.push(firstBaliseInfo.balise);

                let tmp_ret = this.parseHtml(html.slice(start_pos), loop + 1);
                if (tmp_ret) {
                    for (let i = 0; i < tmp_ret.length; i++) {
                        content.push(tmp_ret[i]);
                    }
                }
            } else {
                start_pos = firstBaliseInfo.balise.pos_end;
                content.push(firstBaliseInfo.balise);
                let tmp_ret = this.parseHtml(html.slice(firstBaliseInfo.balise.pos_end), loop + 1);
                if (tmp_ret) {
                    for (let i = 0; i < tmp_ret.length; i++) {
                        content.push(tmp_ret[i]);
                    }
                }
            }
            return content;
        }
        return null;
    }

    this.getPosEndOfBalise = function (html = "", baliseInfo) {
        let pos = baliseInfo.balise.name.length + 1;
        let tmp_html = html.slice(pos);
        let match = 0;

        while (tmp_html.length > 0) {
            let match_end = tmp_html.indexOf("</" + baliseInfo.balise.name);
            let match_start = tmp_html.indexOf("<" + baliseInfo.balise.name);

            if (match_start < match_end && match_start !== -1) {
                match--;
                pos += match_start + 1 + baliseInfo.balise.name.length;
            } else {
                match++;
                if (match == 1) {
                    return match_end + pos;
                }
                pos += 3 + baliseInfo.balise.name.length + match_end;
            }
            tmp_html = html.slice(pos);
        }
    }

    this.getBaliseInfo = function (html = "") {
        let start_balise = html.indexOf("<");
        let end_balise = html.indexOf(" ");

        let tmp_end2 = html.indexOf(">");
        let tmp_end_balise_char = html.indexOf("/>");

        let is_end = true;

        if (tmp_end_balise_char > tmp_end2 || tmp_end_balise_char === -1) {
            tmp_end_balise_char = tmp_end2;
            is_end = false;
        }

        if (tmp_end_balise_char < end_balise || end_balise === -1)
            end_balise = tmp_end_balise_char;

        let balise_name = html.slice(start_balise + 1, end_balise);

        if (['link', 'input'].indexOf(balise_name) !== -1)
            is_end = true;

        let content_line = html.slice(start_balise + 1 + balise_name.length, tmp_end_balise_char).trim();
        let content = null;
        if (content_line != "") {
            content = content_line.split(" ");
            let new_content = [];
            let is_quote = false;
            let tmp_content = "";
            for (let i = 0; i < content.length; i++) {
                if (content[i].indexOf("\"") === -1 && is_quote == false) {
                    new_content.push(content[i]);
                }
                else if (content[i].indexOf("\"") != content[i].lastIndexOf("\"") && is_quote == false)
                    new_content.push(content[i]);
                else {
                    if (content[i].indexOf("\"") !== -1 && is_quote == false) {
                        is_quote = true;
                    }
                    tmp_content += " " + content[i];

                    if (content[i].lastIndexOf("\"") && is_quote == true && content[i].lastIndexOf("\"") == content[i].length - 1) {
                        is_quote = false;
                        new_content.push(tmp_content.trim());
                        tmp_content = "";
                    }
                }
            }
            content = new_content;
        }

        let new_balise = { name: balise_name, content: content, is_end: is_end };
        if (new_balise.is_end == true)
            new_balise["pos_end"] = tmp_end_balise_char;

        return { index: tmp_end2, balise: new_balise };
    }
}
