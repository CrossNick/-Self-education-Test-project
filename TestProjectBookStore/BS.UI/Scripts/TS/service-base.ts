abstract class ServiceBase {
    public constructor() {

    }

    Get(url: string, model: any): JQueryXHR {
        return $.get(url, model);
    }

    GetSync(url: string, model: any): JQueryXHR {
        return $.get({
            url: url,
            data: model,
            async: false
        });
    }

    Post(url: string, model: any): JQueryXHR {
        return $.post(url, model);
    }

    PostSync(url: string, model: any): JQueryXHR {
        return $.post({
            url: url,
            data: model,
            async: false
        });
    }

    Ajax(options: JQueryAjaxSettings): JQueryXHR {
        return $.ajax(options);
    }

    PostJson(url: string, model: any): JQueryXHR {
        return this.Ajax({
            "contentType": "application/json; charset=UTF-8",
            "data": JSON.stringify(model),
            "url": url,
            "method": "POST"
        });
    }

    RedirectLoads(url: string): void {
        location.assign(url);
    }

    JsonToQuery(jsonString: string): string {
        var str = '?';
        str += jsonString.replace(/\:/g, "=").replace("{", '')
            .replace(/\,/g, "&").replace("}", '').
            replace(/"([^"]*)"/g, '$1');
        return str;
    }
};