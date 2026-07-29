import { Helmet } from 'react-helmet-async'

const SITE = 'https://toolkitpk.com'
const OG_IMAGE = `${SITE}/image/Toolkit_pk_logo.png`

/**
 * Drop this at the top of any page's return(), before your own JSX.
 * Example (inside Bmi.jsx):
 *
 *   <SeoHead
 *     title="BMI Calculator — Check Your Body Mass Index Free | ToolKitPK"
 *     description="Free BMI calculator for Pakistan. Enter height and weight in metric or imperial units to instantly check your Body Mass Index category."
 *     path="/bmi-calculator"
 *   />
 */
export default function SeoHead({ title, description, path = '/' }) {
  const url = `${SITE}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content="ToolKitPK" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}