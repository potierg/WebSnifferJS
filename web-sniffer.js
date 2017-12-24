module.exports = function () {
    
        this.exec = function (HTMLContent = "", callback) {
            var html = HTMLContent.replace("\n", "").replace("\r", "").replace("<!DOCTYPE html>", "");
            var datas = this.parseHtml(this.clean_line(html));
    
            callback(datas);
        }
    
        this.parseHtml = function (html = "", loop = 0) {
            let indexHtml = 0;
            html = this.clean_line(html);
            let content = [];
    
            if (loop < 0 || html.length <= 0)
                return null;
    
            while (html[0] != '<' && html.length > 0) {
                html = html.slice(1);
            }
    
            while (html.indexOf("<!--") === 1) {
                html = html.slice(html.indexOf("-->"));
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
    
            if (['link'].indexOf(balise_name) !== -1)
                is_end = true;
    
            let content_line = html.slice(start_balise + 1 + balise_name.length, tmp_end_balise_char).trim();
            let content = null;
            if (content_line != "")
                content = content_line.split(" ");
    
            let new_balise = { name: balise_name, content: content, is_end: is_end };
            if (new_balise.is_end == true)
                new_balise["pos_end"] = tmp_end_balise_char;
    
            return { index: tmp_end2, balise: new_balise };
        }
    
        this.clean_line = function (line) {
            if (!line) return line;
            while (line.indexOf("  ") !== -1) {
                line = line.replace("  ", " ");
            }
            return (line.replace("\t", "").replace("\r", "").trim());
        }
    }
    