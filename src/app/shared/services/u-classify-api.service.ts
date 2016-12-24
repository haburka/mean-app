import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {UcKeyword} from "../models/uc-keyword";

@Injectable()
export class UClassifyAPIService {
    private url: string = "https://api.uclassify.com:443";
    private headers = new Headers();

    constructor(private http: Http) {
        this.headers.append("application", "x-www-form-urlencoded");
        this.headers.append("content-type", "application/json")
    }

    ucGetInfo(classifier: string, username: string){
        return this.http.post(
            "/api/classify-check",
            JSON.stringify({classifier: classifier, username: username}),
            {headers: this.headers}
        ).map((res) => res.json());
    }

    ucPost(classifier: string, username: string, texts: Array<string>, action: string) {
        return this.http.post(
            "/api/classify",
            JSON.stringify({classifier: classifier, username: username, texts: texts, action: action}),
            {headers: this.headers}
        ).map((res) => res.json());
    }

    exampleMessages() : Array<string>{
        return ["Sometimes I'll be solving a problem and after 10 minutes of trying other solutions I'll think, oh wow, this calls for division", "\"npm is 98.4% negative\" \n\nnot surprised", "Trump tweeted \"The United States must greatly strengthen and expand its nuclear capability until such time as the world comes to its senses regarding nukes\"\n\nGot any assassins?", "just finished a facebook app that will tell you if you're negative or positive", "3.625!!!! TAKE THAT OPERATING SYSTEMS", "If our professors are late with our grades then for every day late it should be +1 letter grade for us. Technical issues or sickness are not execusable!", "How many total likes do you have this year? I have 2157 since 12-12\nI want to thank my top 15 fans: Peter Webb Katya McCoy Daniela Merav Jayla Patton Melanie Matthieu Milo Hella Spiders Connie Zumpano Daniel Blevins Sarah Hailey Justin Rushin III Xoyote Hayleigh Robbie McKinstry Sam Pierce Benjamin Podnar Faith Shiphrah Hays", "Building a web app drinking game \n*drink everytime npm install errors \n*drink whenever you switch frameworks \n\nOh God I'm already completely done", "I opened up a issue on a github google maps module for angular 2, like 7 months ago. I couldn't get around it. So I rolled up my own implementation of google maps in two days. It looks like they just solved the problem. Congrats! Open source is amazing!", "So like Pokemon attack each other to the point of almost dying everytime there's a battle, that means they must get hurt a lot during fights. Don't they get really hateful and anxious about fighting or do they not feel pain? Either way it's pretty scary tbh", "Any music suggestions? I like good music.", "web dev - spent 3 hours working on something that ended up being the 3rd answer on SO", "I'm happy. How about you?", "84% of millenials --- woah buddy don't talk about me or my friends like that", "When you can't tell if your memes are good so you ask their friends and they say that your memes suck. Thanks.", "Programming at Pitt: I don't have to write anymore C but now I'm not terrible at it", "One more semester left!", "Everyone's talking about fake news being bad whereas no one is talking about real news that is biased. SMH", "So I finished a paper on how the seduction community rewards it's users who appeal to rape culture by affirming their (fragile) masculinity. It's 14 pages long and possibly not the most polished thing in the world but it's a pretty fun read in my opinion. I'd love to share it with whoever is interested. Just DM me and I'll send it to you.", "I'm writing a paper about masculinity online and now I hate men", "Dear English majors, do you out the period after or before the smiley if the smiley is at the end of a sentence? Ie :). Or. :)", "Trump hasn't tweeted in 6 days... How am I supposed to be informed about the security of the nation if he's not tweeting?!?!!?", "My phone corrected kafka to madoka", "If you miss my humorous statuses, I have placed my energy into a page called DankBank. I pick memes that are original, not too popular and that are genuinely funny. \nIf you want to see my content, you should like this page!", "People who do web design, what's up? Do you do side projects ever?", "\"how are you condemning a group with the actions of a few people?\" \n\nBuddy welcome to 2016", "Dankbank reached 60 people yesterday. Apparently I have filled a gap of meme-related needs\n\nhttps://www.facebook.com/D_a_n_k_b_a_n_k-1325594237511346", "Being a computer science student is just working on something and looking around at other people and thinking, wow they must have so much time to do other things like talking to people god I'm jealous", "Could 👏 you 👏 use 👏 some 👏 memes ❓❓❓ \nD👏A👏 N👏 K🏦", "If you want to get sent dank memes just let me know, we can make a group for it", "Trump is signing documents so he will be completely out of business operations. I think that means there are no more conflicts of interest? It still seems pretty likely he will sign laws that would make him more wealthy but at least he's not running trump hotel while running the white house.", "When you're hanging out with the bros and it becomes melee 1v1s", "Danez Smith is the master of the list, this is one of the best examples of his work.", "Here are some biases; be on the lookout!\n\nNaïve realism: The experience that one's perceptions of the world  is complete, accurate, and correct.\n \nConfirmation bias: The tendency to search for, interpret, focus on and remember information in a way that confirms one's existing beliefs, and ignore/dismiss information that challenges it.\n \nDunning-Kruger effect: The tendency for unskilled individuals to overestimate their own ability and the tendency for experts to underestimate their own ability\n \nStatus quo bias: The tendency to keep things the way they are instead of actively changing them, e.g., fewer people will be organ donors if they have to opt in than if they have to opt out\n \nFundamental attribution error: The tendency for people to attribute others’ behavior to their personality and attribute their own behavior to the situation (e.g., if someone else says something rude they are a rude person, if I say something rude I am having a bad day)\n \nIllusion of asymmetric insight: People perceive their knowledge of their peers to surpass their peers' knowledge of them.\n \nIllusion of explanatory depth: the feeling that one knows and understands how something works more deeply than they actually do (e.g., the big picture always makes sense, but when you try to work out the details of a problem you realize how incomplete your understanding really was)\n \nCurse of knowledge/expertise: When better-informed people find it extremely difficult to understand problems from the perspective of lesser-informed people, and thus have trouble explaining them.\n \nAvailability heuristic: The tendency to overestimate the likelihood of events with greater \"availability\" in memory, which can be influenced by how recent the memories are or how unusual or emotionally charged they may be. (e.g., like thinking flying is more dangerous than driving)\n \nFraming effect: Drawing different conclusions from the same information, depending on how that information is presented (e.g., http://www.adsavvy.org/the-power-of-framing-effects-and-other-cognitive-biases/)\n \nHindsight bias: Sometimes called the \"I-knew-it-all-along\" effect, the tendency to see past events as being predictable at the time those events happened and thus inevitable.\n \nMere exposure effect:    The tendency to express undue liking for things merely because of familiarity with them\n \nOmission bias:    The tendency to judge harmful actions as worse, or less moral, than equally harmful omissions (inactions) (lots of “irrational” decision making in this domain).\n \nFalse consensus effect: The tendency for people to overestimate the degree to which others agree with them.\n \nBias blind spot: The belief that I am less biased than others.", "when you send critical feedback using a survey that you thought was anonymous..........", "I'm doing this for a gift card, please don't judge me", "\"perhaps 2016 wasn't so bad\"\ni see this status, sitting inside a burned-down planned parenthood, blogging on the trump-ternet outside of a trumpbucks. I drink trumpkin spice latte and like the status with a trump-emoji", "Only 90s kids will get this: \nLying on your back thinking you should do things for hours", "we should start a movement where we record conversations we have with our extended family about standing rock and post it to FB / Instagram. If you're in my family and reading this then don't make it awkward ^_^", "People born from 1982 to 2002, you're a millennial. Yes. I'm sorry if that's hard to accept but if you're under the age of 34 then you're a millennial. Deal with it.", "Facebook should put blue flames around your profile picture whenever you're getting lots of likes", "I just caught a pidgey and then it turned into a ditto! Omg! Since I don't read the forums this came as a huge surprise. Awesome!", "Wow this is so fucked up. Fucking Nazi trumps."]
    }

    exampleClassify() {
        return [[{"className": "negative", "p": 0.601099, "keyword": "calls"}, {
            "className": "positive",
            "p": 0.608119,
            "keyword": "wow"
        }, {"className": "negative", "p": 0.647115, "keyword": "trying"}, {
            "className": "negative",
            "p": 0.65507,
            "keyword": "problem"
        }, {"className": "negative", "p": 0.629727, "keyword": "minutes"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.621759, "keyword": "4%"}, {
            "className": "negative",
            "p": 0.983871,
            "keyword": "npm"
        }, {"className": "negative", "p": 0.625975, "keyword": "98"}], [{
            "className": "positive",
            "p": 0.604174,
            "keyword": "world"
        }, {"className": "positive", "p": 0.605051, "keyword": "senses"}, {
            "className": "positive",
            "p": 0.608954,
            "keyword": "must"
        }, {"className": "positive", "p": 0.642547, "keyword": "strengthen"}, {
            "className": "positive",
            "p": 0.606495,
            "keyword": "expand"
        }], [], [{"className": "negative", "p": 0.677781, "keyword": "625"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }], [{"className": "negative", "p": 0.684732, "keyword": "total"}, {
            "className": "negative",
            "p": 0.717512,
            "keyword": "12-12"
        }, {"className": "positive", "p": 0.781353, "keyword": "thank"}], [{
            "className": "negative",
            "p": 0.633866,
            "keyword": "completely"
        }, {"className": "positive", "p": 0.656347, "keyword": "frameworks"}, {
            "className": "negative",
            "p": 0.810726,
            "keyword": "errors"
        }, {"className": "negative", "p": 0.983871, "keyword": "npm"}, {
            "className": "negative",
            "p": 0.664996,
            "keyword": "install"
        }], [{"className": "negative", "p": 0.65507, "keyword": "problem"}, {
            "className": "positive",
            "p": 0.672534,
            "keyword": "angular"
        }, {"className": "positive", "p": 0.662835, "keyword": "github"}, {
            "className": "positive",
            "p": 0.806707,
            "keyword": "amazing"
        }], [{"className": "positive", "p": 0.608954, "keyword": "must"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "positive", "p": 0.623467, "keyword": "each"}, {
            "className": "negative",
            "p": 0.706821,
            "keyword": "hateful"
        }, {"className": "negative", "p": 0.646516, "keyword": "hurt"}], [{
            "className": "positive",
            "p": 0.605078,
            "keyword": "music"
        }], [{"className": "negative", "p": 0.63255, "keyword": "ended"}, {
            "className": "negative",
            "p": 0.651613,
            "keyword": "spent"
        }], [{"className": "positive", "p": 0.698862, "keyword": "happy"}], [{
            "className": "positive",
            "p": 0.60129,
            "keyword": "woah"
        }, {"className": "negative", "p": 0.97619, "keyword": "millenials"}], [{
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.724808, "keyword": "suck"}], [{
            "className": "negative",
            "p": 0.607974,
            "keyword": "write"
        }, {"className": "negative", "p": 0.737861, "keyword": "anymore"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.849125, "keyword": "terrible"}], [{
            "className": "negative",
            "p": 0.602598,
            "keyword": "left"
        }], [{"className": "negative", "p": 0.637237, "keyword": "no"}, {
            "className": "negative",
            "p": 0.644459,
            "keyword": "biased"
        }, {"className": "negative", "p": 0.736696, "keyword": "bad"}, {
            "className": "negative",
            "p": 0.698028,
            "keyword": "fake"
        }], [{"className": "negative", "p": 0.603992, "keyword": "send"}, {
            "className": "positive",
            "p": 0.604174,
            "keyword": "world"
        }, {"className": "negative", "p": 0.609804, "keyword": "not"}, {
            "className": "negative",
            "p": 0.662653,
            "keyword": "rape"
        }, {"className": "negative", "p": 0.637693, "keyword": "whoever"}, {
            "className": "negative",
            "p": 0.613816,
            "keyword": "paper"
        }, {"className": "positive", "p": 0.648561, "keyword": "share"}, {
            "className": "positive",
            "p": 0.703114,
            "keyword": "affirming"
        }, {"className": "negative", "p": 0.682764, "keyword": "pages"}, {
            "className": "positive",
            "p": 0.667187,
            "keyword": "rewards"
        }, {"className": "positive", "p": 0.652289, "keyword": "polished"}, {
            "className": "positive",
            "p": 0.674616,
            "keyword": "fun"
        }, {"className": "positive", "p": 0.713866, "keyword": "love"}, {
            "className": "negative",
            "p": 0.954545,
            "keyword": "(fragile)"
        }], [{"className": "negative", "p": 0.613816, "keyword": "paper"}, {
            "className": "negative",
            "p": 0.732204,
            "keyword": "hate"
        }], [{"className": "positive", "p": 0.632936, "keyword": "smiley"}, {
            "className": "negative",
            "p": 0.68069,
            "keyword": "sentence"
        }], [{"className": "negative", "p": 0.609804, "keyword": "not"}, {
            "className": "negative",
            "p": 0.765104,
            "keyword": "supposed"
        }, {"className": "positive", "p": 0.630007, "keyword": "tweeting"}], [{
            "className": "negative",
            "p": 0.630613,
            "keyword": "madoka"
        }, {"className": "negative", "p": 0.666573, "keyword": "phone"}], [{
            "className": "positive",
            "p": 0.601403,
            "keyword": "energy"
        }, {"className": "negative", "p": 0.606559, "keyword": "called"}, {
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.623732, "keyword": "too"}, {
            "className": "negative",
            "p": 0.611502,
            "keyword": "page"
        }, {"className": "negative", "p": 0.687087, "keyword": "miss"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "positive", "p": 0.65356, "keyword": "humorous"}], [], [{
            "className": "negative",
            "p": 0.611833,
            "keyword": "condemning"
        }, {"className": "negative", "p": 0.771311, "keyword": "2016"}, {
            "className": "positive",
            "p": 0.82547,
            "keyword": "welcome"
        }], [{"className": "positive", "p": 0.694176, "keyword": "//www"}, {
            "className": "negative",
            "p": 0.721418,
            "keyword": "https"
        }], [{"className": "positive", "p": 0.608119, "keyword": "wow"}, {
            "className": "positive",
            "p": 0.608954,
            "keyword": "must"
        }], [{"className": "negative", "p": 0.607749, "keyword": "memes"}], [{
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.646534, "keyword": "sent"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.614622, "keyword": "least"}, {
            "className": "negative",
            "p": 0.633866,
            "keyword": "completely"
        }, {"className": "negative", "p": 0.637237, "keyword": "no"}, {
            "className": "negative",
            "p": 0.621052,
            "keyword": "seems"
        }], [{"className": "positive", "p": 0.604843, "keyword": "melee"}], [{
            "className": "positive",
            "p": 0.682024,
            "keyword": "master"
        }, {"className": "positive", "p": 0.741604, "keyword": "best"}], [{
            "className": "negative",
            "p": 0.62742,
            "keyword": "charged"
        }, {"className": "positive", "p": 0.632293, "keyword": "perceptions"}, {
            "className": "positive",
            "p": 0.634623,
            "keyword": "understanding"
        }, {"className": "negative", "p": 0.633348, "keyword": "domain)"}, {
            "className": "negative",
            "p": 0.658263,
            "keyword": "instead"
        }, {"className": "positive", "p": 0.636015, "keyword": "influenced"}, {
            "className": "negative",
            "p": 0.639306,
            "keyword": "happened"
        }, {"className": "negative", "p": 0.639466, "keyword": "bias"}, {
            "className": "positive",
            "p": 0.635797,
            "keyword": "underestimate"
        }, {"className": "positive", "p": 0.668565, "keyword": "perspective"}, {
            "className": "positive",
            "p": 0.675945,
            "keyword": "surpass"
        }, {"className": "negative", "p": 0.669499, "keyword": "attribution"}, {
            "className": "negative",
            "p": 0.65507,
            "keyword": "problem"
        }, {"className": "positive", "p": 0.699047, "keyword": "organ"}, {
            "className": "negative",
            "p": 0.644459,
            "keyword": "biased"
        }, {"className": "negative", "p": 0.736696, "keyword": "bad"}, {
            "className": "positive",
            "p": 0.680423,
            "keyword": "driving)"
        }, {"className": "negative", "p": 0.798506, "keyword": "predictable"}, {
            "className": "negative",
            "p": 0.831895,
            "keyword": "worse"
        }, {"className": "positive", "p": 0.749942, "keyword": "challenges"}, {
            "className": "negative",
            "p": 0.715882,
            "keyword": "rude"
        }, {"className": "negative", "p": 0.954545, "keyword": "lesser-informed"}, {
            "className": "positive",
            "p": 0.683411,
            "keyword": "unusual"
        }, {"className": "negative", "p": 0.755744, "keyword": "unskilled"}, {
            "className": "negative",
            "p": 0.681067,
            "keyword": "omissions"
        }, {"className": "negative", "p": 0.793585, "keyword": "error"}, {
            "className": "positive",
            "p": 0.846805,
            "keyword": "better-informed"
        }, {"className": "negative", "p": 0.763558, "keyword": "incomplete"}, {
            "className": "positive",
            "p": 0.708429,
            "keyword": "memories"
        }, {"className": "positive", "p": 0.694176, "keyword": "//www"}], [{
            "className": "negative",
            "p": 0.603992,
            "keyword": "send"
        }], [{"className": "positive", "p": 0.635676, "keyword": "gift"}], [{
            "className": "positive",
            "p": 0.616773,
            "keyword": "latte"
        }, {"className": "positive", "p": 0.690636, "keyword": "blogging"}, {
            "className": "positive",
            "p": 0.960026,
            "keyword": "burned-down"
        }, {"className": "negative", "p": 0.771311, "keyword": "2016"}, {
            "className": "negative",
            "p": 0.736696,
            "keyword": "bad"
        }], [], [{"className": "positive", "p": 0.6349, "keyword": "family"}, {
            "className": "positive",
            "p": 0.656906,
            "keyword": "rock"
        }, {"className": "negative", "p": 0.643796, "keyword": "awkward"}, {
            "className": "positive",
            "p": 0.866394,
            "keyword": "^_^"
        }], [{"className": "negative", "p": 0.784547, "keyword": "sorry"}], [], [{
            "className": "positive",
            "p": 0.61744,
            "keyword": "surprise"
        }, {"className": "negative", "p": 0.625028, "keyword": "ditto"}, {
            "className": "negative",
            "p": 0.665795,
            "keyword": "forums"
        }, {"className": "positive", "p": 0.979181, "keyword": "pidgey"}], [{
            "className": "negative",
            "p": 0.77539,
            "keyword": "fucked"
        }]]
    }

    exampleKeyword(): Array<Array<UcKeyword>> {
        return [[{"className": "negative", "p": 0.601099, "keyword": "calls"}, {
            "className": "positive",
            "p": 0.608119,
            "keyword": "wow"
        }, {"className": "negative", "p": 0.647115, "keyword": "trying"}, {
            "className": "negative",
            "p": 0.65507,
            "keyword": "problem"
        }, {"className": "negative", "p": 0.629727, "keyword": "minutes"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.621759, "keyword": "4%"}, {
            "className": "negative",
            "p": 0.983871,
            "keyword": "npm"
        }, {"className": "negative", "p": 0.625975, "keyword": "98"}], [{
            "className": "positive",
            "p": 0.604174,
            "keyword": "world"
        }, {"className": "positive", "p": 0.605051, "keyword": "senses"}, {
            "className": "positive",
            "p": 0.608954,
            "keyword": "must"
        }, {"className": "positive", "p": 0.642547, "keyword": "strengthen"}, {
            "className": "positive",
            "p": 0.606495,
            "keyword": "expand"
        }], [], [{"className": "negative", "p": 0.677781, "keyword": "625"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }], [{"className": "negative", "p": 0.684732, "keyword": "total"}, {
            "className": "negative",
            "p": 0.717512,
            "keyword": "12-12"
        }, {"className": "positive", "p": 0.781353, "keyword": "thank"}], [{
            "className": "negative",
            "p": 0.633866,
            "keyword": "completely"
        }, {"className": "positive", "p": 0.656347, "keyword": "frameworks"}, {
            "className": "negative",
            "p": 0.810726,
            "keyword": "errors"
        }, {"className": "negative", "p": 0.983871, "keyword": "npm"}, {
            "className": "negative",
            "p": 0.664996,
            "keyword": "install"
        }], [{"className": "negative", "p": 0.65507, "keyword": "problem"}, {
            "className": "positive",
            "p": 0.672534,
            "keyword": "angular"
        }, {"className": "positive", "p": 0.662835, "keyword": "github"}, {
            "className": "positive",
            "p": 0.806707,
            "keyword": "amazing"
        }], [{"className": "positive", "p": 0.608954, "keyword": "must"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "positive", "p": 0.623467, "keyword": "each"}, {
            "className": "negative",
            "p": 0.706821,
            "keyword": "hateful"
        }, {"className": "negative", "p": 0.646516, "keyword": "hurt"}], [{
            "className": "positive",
            "p": 0.605078,
            "keyword": "music"
        }], [{"className": "negative", "p": 0.63255, "keyword": "ended"}, {
            "className": "negative",
            "p": 0.651613,
            "keyword": "spent"
        }], [{"className": "positive", "p": 0.698862, "keyword": "happy"}], [{
            "className": "positive",
            "p": 0.60129,
            "keyword": "woah"
        }, {"className": "negative", "p": 0.97619, "keyword": "millenials"}], [{
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.724808, "keyword": "suck"}], [{
            "className": "negative",
            "p": 0.607974,
            "keyword": "write"
        }, {"className": "negative", "p": 0.737861, "keyword": "anymore"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.849125, "keyword": "terrible"}], [{
            "className": "negative",
            "p": 0.602598,
            "keyword": "left"
        }], [{"className": "negative", "p": 0.637237, "keyword": "no"}, {
            "className": "negative",
            "p": 0.644459,
            "keyword": "biased"
        }, {"className": "negative", "p": 0.736696, "keyword": "bad"}, {
            "className": "negative",
            "p": 0.698028,
            "keyword": "fake"
        }], [{"className": "negative", "p": 0.603992, "keyword": "send"}, {
            "className": "positive",
            "p": 0.604174,
            "keyword": "world"
        }, {"className": "negative", "p": 0.609804, "keyword": "not"}, {
            "className": "negative",
            "p": 0.662653,
            "keyword": "rape"
        }, {"className": "negative", "p": 0.637693, "keyword": "whoever"}, {
            "className": "negative",
            "p": 0.613816,
            "keyword": "paper"
        }, {"className": "positive", "p": 0.648561, "keyword": "share"}, {
            "className": "positive",
            "p": 0.703114,
            "keyword": "affirming"
        }, {"className": "negative", "p": 0.682764, "keyword": "pages"}, {
            "className": "positive",
            "p": 0.667187,
            "keyword": "rewards"
        }, {"className": "positive", "p": 0.652289, "keyword": "polished"}, {
            "className": "positive",
            "p": 0.674616,
            "keyword": "fun"
        }, {"className": "positive", "p": 0.713866, "keyword": "love"}, {
            "className": "negative",
            "p": 0.954545,
            "keyword": "(fragile)"
        }], [{"className": "negative", "p": 0.613816, "keyword": "paper"}, {
            "className": "negative",
            "p": 0.732204,
            "keyword": "hate"
        }], [{"className": "positive", "p": 0.632936, "keyword": "smiley"}, {
            "className": "negative",
            "p": 0.68069,
            "keyword": "sentence"
        }], [{"className": "negative", "p": 0.609804, "keyword": "not"}, {
            "className": "negative",
            "p": 0.765104,
            "keyword": "supposed"
        }, {"className": "positive", "p": 0.630007, "keyword": "tweeting"}], [{
            "className": "negative",
            "p": 0.630613,
            "keyword": "madoka"
        }, {"className": "negative", "p": 0.666573, "keyword": "phone"}], [{
            "className": "positive",
            "p": 0.601403,
            "keyword": "energy"
        }, {"className": "negative", "p": 0.606559, "keyword": "called"}, {
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.623732, "keyword": "too"}, {
            "className": "negative",
            "p": 0.611502,
            "keyword": "page"
        }, {"className": "negative", "p": 0.687087, "keyword": "miss"}, {
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "positive", "p": 0.65356, "keyword": "humorous"}], [], [{
            "className": "negative",
            "p": 0.611833,
            "keyword": "condemning"
        }, {"className": "negative", "p": 0.771311, "keyword": "2016"}, {
            "className": "positive",
            "p": 0.82547,
            "keyword": "welcome"
        }], [{"className": "positive", "p": 0.694176, "keyword": "//www"}, {
            "className": "negative",
            "p": 0.721418,
            "keyword": "https"
        }], [{"className": "positive", "p": 0.608119, "keyword": "wow"}, {
            "className": "positive",
            "p": 0.608954,
            "keyword": "must"
        }], [{"className": "negative", "p": 0.607749, "keyword": "memes"}], [{
            "className": "negative",
            "p": 0.607749,
            "keyword": "memes"
        }, {"className": "negative", "p": 0.646534, "keyword": "sent"}], [{
            "className": "negative",
            "p": 0.609804,
            "keyword": "not"
        }, {"className": "negative", "p": 0.614622, "keyword": "least"}, {
            "className": "negative",
            "p": 0.633866,
            "keyword": "completely"
        }, {"className": "negative", "p": 0.637237, "keyword": "no"}, {
            "className": "negative",
            "p": 0.621052,
            "keyword": "seems"
        }], [{"className": "positive", "p": 0.604843, "keyword": "melee"}], [{
            "className": "positive",
            "p": 0.682024,
            "keyword": "master"
        }, {"className": "positive", "p": 0.741604, "keyword": "best"}], [{
            "className": "negative",
            "p": 0.62742,
            "keyword": "charged"
        }, {"className": "positive", "p": 0.632293, "keyword": "perceptions"}, {
            "className": "positive",
            "p": 0.634623,
            "keyword": "understanding"
        }, {"className": "negative", "p": 0.633348, "keyword": "domain)"}, {
            "className": "negative",
            "p": 0.658263,
            "keyword": "instead"
        }, {"className": "positive", "p": 0.636015, "keyword": "influenced"}, {
            "className": "negative",
            "p": 0.639306,
            "keyword": "happened"
        }, {"className": "negative", "p": 0.639466, "keyword": "bias"}, {
            "className": "positive",
            "p": 0.635797,
            "keyword": "underestimate"
        }, {"className": "positive", "p": 0.668565, "keyword": "perspective"}, {
            "className": "positive",
            "p": 0.675945,
            "keyword": "surpass"
        }, {"className": "negative", "p": 0.669499, "keyword": "attribution"}, {
            "className": "negative",
            "p": 0.65507,
            "keyword": "problem"
        }, {"className": "positive", "p": 0.699047, "keyword": "organ"}, {
            "className": "negative",
            "p": 0.644459,
            "keyword": "biased"
        }, {"className": "negative", "p": 0.736696, "keyword": "bad"}, {
            "className": "positive",
            "p": 0.680423,
            "keyword": "driving)"
        }, {"className": "negative", "p": 0.798506, "keyword": "predictable"}, {
            "className": "negative",
            "p": 0.831895,
            "keyword": "worse"
        }, {"className": "positive", "p": 0.749942, "keyword": "challenges"}, {
            "className": "negative",
            "p": 0.715882,
            "keyword": "rude"
        }, {"className": "negative", "p": 0.954545, "keyword": "lesser-informed"}, {
            "className": "positive",
            "p": 0.683411,
            "keyword": "unusual"
        }, {"className": "negative", "p": 0.755744, "keyword": "unskilled"}, {
            "className": "negative",
            "p": 0.681067,
            "keyword": "omissions"
        }, {"className": "negative", "p": 0.793585, "keyword": "error"}, {
            "className": "positive",
            "p": 0.846805,
            "keyword": "better-informed"
        }, {"className": "negative", "p": 0.763558, "keyword": "incomplete"}, {
            "className": "positive",
            "p": 0.708429,
            "keyword": "memories"
        }, {"className": "positive", "p": 0.694176, "keyword": "//www"}], [{
            "className": "negative",
            "p": 0.603992,
            "keyword": "send"
        }], [{"className": "positive", "p": 0.635676, "keyword": "gift"}], [{
            "className": "positive",
            "p": 0.616773,
            "keyword": "latte"
        }, {"className": "positive", "p": 0.690636, "keyword": "blogging"}, {
            "className": "positive",
            "p": 0.960026,
            "keyword": "burned-down"
        }, {"className": "negative", "p": 0.771311, "keyword": "2016"}, {
            "className": "negative",
            "p": 0.736696,
            "keyword": "bad"
        }], [], [{"className": "positive", "p": 0.6349, "keyword": "family"}, {
            "className": "positive",
            "p": 0.656906,
            "keyword": "rock"
        }, {"className": "negative", "p": 0.643796, "keyword": "awkward"}, {
            "className": "positive",
            "p": 0.866394,
            "keyword": "^_^"
        }], [{"className": "negative", "p": 0.784547, "keyword": "sorry"}], [], [{
            "className": "positive",
            "p": 0.61744,
            "keyword": "surprise"
        }, {"className": "negative", "p": 0.625028, "keyword": "ditto"}, {
            "className": "negative",
            "p": 0.665795,
            "keyword": "forums"
        }, {"className": "positive", "p": 0.979181, "keyword": "pidgey"}], [{
            "className": "negative",
            "p": 0.77539,
            "keyword": "fucked"
        }]]
    }
}
