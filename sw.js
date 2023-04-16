/* push event payloads
{"title": "unRAID:", "options": {"body": "Anyone else having (slight) UI problems with 6.12 in FireFox?", "icon": "https://external-preview.redd.it/mfZaKwUbd8yEj6R5x8zd-XEfcr-3skpU69-5_fAd6bA.jpg?width=1080&crop=smart&auto=webp&s=4e7d41b1da3be3c638fd8b416e78584a61b43b9a", "data": {"link": "https://www.reddit.com/r/unRAID/comments/11wvgts/anyone_else_having_slight_ui_problems_with_612_in/", "correlation_id": "8fc732ec-e996-42c0-a9be-0725e3d3e607", "message_type": "lifecycle_post_suggestions", "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e", "auto_dismiss_options": {"behavior": "timed", "dismiss_time_ms": 25000}}}, "data": {"extra_payload_fields": {"subreddit_id": "t5_2sn94", "post_id": "t3_11wvgts", "is_persisted": true, "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e"}}}
{"title": "zfs:", "options": {"body": "Rsyncing 20TB locally", "icon": "https://www.redditstatic.com/emaildigest/reddit_community.png", "data": {"link": "https://www.reddit.com/r/zfs/comments/11x8qw1/rsyncing_20tb_locally/", "correlation_id": "97bfc3c3-5bc4-4cd8-8e94-c4c58b7a8411", "message_type": "lifecycle_post_suggestions", "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e", "auto_dismiss_options": {"behavior": "timed", "dismiss_time_ms": 25000}}}, "data": {"extra_payload_fields": {"subreddit_id": "t5_2ruui", "post_id": "t3_11x8qw1", "is_persisted": true, "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e"}}}
{"title": "unRAID:", "options": {"body": "Unraid 6.12.0-rc2 Now Available", "icon": "https://external-preview.redd.it/fTqjd8F-gt09fmvhoTxhj0fU4nR0jzSpVGXbPxhyI8E.jpg?width=1080&crop=smart&auto=webp&s=8662f69777603190b819c02534c3977b7b149aec", "data": {"link": "https://www.reddit.com/r/unRAID/comments/11xxcu5/unraid_6120rc2_now_available/", "correlation_id": "7e4297be-1973-4694-ae07-055a47648241", "message_type": "lifecycle_post_suggestions", "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e", "auto_dismiss_options": {"behavior": "timed", "dismiss_time_ms": 25000}}}, "data": {"extra_payload_fields": {"subreddit_id": "t5_2sn94", "post_id": "t3_11xxcu5", "is_persisted": true, "device_id": "2ab94a31627036941e4100dff5b01bf263053650483f62039b9000e498cd860e"}}}
*/

let i = /\/chat\/(?:r\/)?(\w*)?\/?(?:channel\/)(?:sendbird_group_channel_)?(\w+)\/?(?:message\/)?(\w+)?/;
let f = (t,e)=>n=>{
    n.filter(e=>e.data.message_type === t).slice(0, -e).forEach(t=>t.close())
};
let a = f("broadcast_follower", 3);
let r = f("broadcast_recommendation", 3);
const s = {};

// Install the service worker and cache the resources
self.addEventListener("push", t=>{

    const n = t.data.json()
      , o = n.title
      , s = n.options || {}
      , c = n.data;
    Boolean(c && c.extra_payload_fields) && (s.data || (s.data = {}),
    s.data.extra_payload_fields = c.extra_payload_fields),
    s.icon || (s.icon = "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png");//,
    //t.waitUntil(p(0, "receive", s.data));
    const d = ((t={})=>{
        if (t.group_id)
            return t.group_id;
        if (t.data && t.data.link) {
            const e = t.data.link.match(i);
            if (e && e.length > 2) {
                return e[2]
            }
        }
    }
    )(s);
    d && (s.tag = d,
    s.renotify = !0);
    const l = s.data.auto_dismiss_options;
    void 0 !== l ? "device_default" !== l.behavior && (s.requireInteraction = !0) : s.requireInteraction = !1,
    t.waitUntil(self.registration.showNotification(o, s).then(()=>self.registration.getNotifications()).then(t=>{
        if (a(t),
        r(t),
        void 0 === l || "timed" !== l.behavior)
            return;
        let e;
        for (let i = 0; i < t.length; i++)
            if (t[i].data.correlationId === n.correlationId) {
                if (e = t[i],
                void 0 === e)
                    continue;
                setTimeout(e.close.bind(e), l.dismiss_time_ms)
            }
    }
    ))
}
)

self.addEventListener("notificationclick", t=>{
    t.notification.close();
    const e = t.notification.data.link
      , n = e.match(i)
      , o = Boolean(n)
      , a = o ? n[2] : ""
      , r = new RegExp("/chat/(?:r/)?(w*)?/?(?:channel/)(?:sendbird_group_channel_)?" + a)
      , c = t=>{
        try {
            const n = e.replace(/sendbird_group_channel_/, "");
            t.focus(),
            t.postMessage({
                type: "navigate.chat",
                data: {
                    href: n
                }
            })
        } catch (t) {
            console.error(t)
        }
    }
    ;
    t.waitUntil(clients.matchAll({
        type: "window"
    }).then(t=>{
        const n = t.filter(t=>"focus"in t)
          , a = n.filter(t=>t.id in s)
          , d = o ? n.filter(t=>i.test(t.url)) : []
          , l = o ? d.filter(t=>r.test(t.url)) : []
          , f = n.filter(t=>t.url === e)
          , u = f.find(t=>t.focused);
        if (u)
            u.focus();
        else if (f.length > 0)
            f[0].focus();
        else if (o && l.length > 0)
            c(l[0]);
        else if (o && d.length > 0)
            c(d[0]);
        else if (o && a.length > 0)
            c(a[0]);
        else
            try {
                clients.openWindow(e)
            } catch (t) {
                console.error(t)
            }
    }
    ))//,
    // t.waitUntil(p(0, "click", t.notification.data))
}
)