import { Content, Template } from "./type";

const researchPaperTemplateContent: Content = [
  {
    type: "heading",
    props: {
      level: 1,
    },
    content: "The Impact of Social Media on Mental Health Among Teenagers",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Jane Doe",
        styles: { italic: true },
      },
    ],
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "Abstract",
  },
  {
    type: "paragraph",
    content:
      "This study examines the relationship between social media use and mental health outcomes among teenagers aged 13-18. Through a mixed-methods approach involving surveys and in-depth interviews, we found a significant correlation between excessive social media use and increased symptoms of anxiety and depression. However, the study also revealed potential positive effects of social media, such as increased social support and access to mental health resources. These findings highlight the complex nature of social media's impact on teenage mental health and suggest the need for balanced approaches in addressing this issue.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "1. Introduction",
  },
  {
    type: "paragraph",
    content:
      "In recent years, social media has become an integral part of teenagers' lives, with platforms like Instagram, TikTok, and Snapchat dominating their digital interactions. While these platforms offer unprecedented opportunities for connectivity and self-expression, concerns have been raised about their potential negative impact on mental health. This study aims to investigate the relationship between social media use and mental health outcomes among teenagers, addressing the following research question: To what extent does social media use affect the mental well-being of teenagers aged 13-18?",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "2. Literature Review",
  },
  {
    type: "paragraph",
    content:
      "Previous research has yielded mixed results regarding the impact of social media on mental health. Smith et al. (2018) found a positive correlation between time spent on social media and depressive symptoms in adolescents. Conversely, Johnson and Brown (2020) highlighted the potential benefits of social media in providing social support and reducing feelings of isolation. This study builds upon existing literature by...",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "3. Methodology",
  },
  {
    type: "paragraph",
    content:
      "This study employed a mixed-methods approach, combining quantitative surveys with qualitative interviews. A sample of 500 teenagers aged 13-18 completed online surveys measuring social media use, anxiety levels, and depressive symptoms. Additionally, 20 in-depth interviews were conducted to gain deeper insights into participants' experiences with social media and its perceived impact on their mental health.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "4. Results",
  },
  {
    type: "paragraph",
    content:
      "Survey results revealed a significant positive correlation (r = 0.42, p < 0.001) between daily hours spent on social media and reported symptoms of anxiety and depression. Qualitative data from interviews supported these findings, with themes of social comparison, fear of missing out (FOMO), and online bullying emerging as key contributors to negative mental health outcomes.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "5. Discussion",
  },
  {
    type: "paragraph",
    content:
      "The findings of this study suggest a complex relationship between social media use and teenage mental health. While excessive use is associated with negative outcomes, moderate use combined with positive online experiences can potentially enhance social support and well-being. These results highlight the need for nuanced approaches in addressing social media's impact on mental health, including digital literacy education and the promotion of healthy online habits.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "6. Conclusion",
  },
  {
    type: "paragraph",
    content:
      "This study provides evidence for both the potential risks and benefits of social media use on teenage mental health. Future research should focus on developing and evaluating interventions that mitigate the negative impacts while leveraging the positive aspects of social media for promoting mental well-being among teenagers.",
  },
  {
    type: "heading",
    props: {
      level: 2,
    },
    content: "References",
  },
  {
    type: "paragraph",
    content:
      "Smith, A., et al. (2018). Social media use and depressive symptoms in adolescents: A longitudinal study. Journal of Adolescent Health, 63(2), 215-221.\n\nJohnson, K., & Brown, L. (2020). The role of social media in reducing social isolation among teenagers. Cyberpsychology, Behavior, and Social Networking, 23(4), 254-259.",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Tip: Use '/' to insert tables, images, or code blocks for data visualization.",
        styles: { italic: true, textColor: "gray" },
      },
    ],
  },
];

export const researchPaperTemplate: Template = {
  title: "Research Paper",
  type: "research",
  pageType: "page",

  emoji: "🔍",
  content: JSON.stringify(researchPaperTemplateContent),
};
