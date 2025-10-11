import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | PDF Tools",
  description: "Learn how PDF Tools collects, uses, and protects your personal information.",
}

/**
 * Privacy Policy page component
 * Displays the privacy policy for PDF Tools application
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 pt-28 pb-20 md:pt-36 md:pb-32 max-w-4xl">
        <Button 
          variant="outline" 
          size="lg"
          asChild
          className="mb-8 font-semibold shadow-sm hover:shadow-md transition-all border-2"
        >
          <Link href="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </Button>
        <div className="backdrop-blur-md bg-background/70 border border-border/40 rounded-2xl px-8 py-10 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to PDF Tools. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Technical data including IP address, browser type, and device information</li>
                <li>Usage data including how you use our website and services</li>
                <li>Files you upload for processing (temporarily stored during conversion)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>To provide and maintain our PDF conversion services</li>
                <li>To improve and optimize our website functionality</li>
                <li>To analyze usage patterns and improve user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We have implemented appropriate security measures to prevent your personal data from being accidentally 
                lost, used, or accessed in an unauthorized way. All uploaded files are processed securely and are 
                automatically deleted from our servers after processing is complete. We limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected 
                it for. Uploaded files are automatically deleted from our servers immediately after processing. 
                Technical and usage data may be retained for analytical purposes for a maximum of 24 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Your Legal Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may include links to third-party websites, plug-ins, and applications. Clicking on those 
                links or enabling those connections may allow third parties to collect or share data about you. We do 
                not control these third-party websites and are not responsible for their privacy statements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain 
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
                sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:me@youssef.tn" className="text-primary hover:underline">
                  me@youssef.tn
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

