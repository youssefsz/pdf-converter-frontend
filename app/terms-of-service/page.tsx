import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | PDF Tools",
  description: "Read the terms and conditions for using PDF Tools services.",
}

/**
 * Terms of Service page component
 * Displays the terms and conditions for using PDF Tools application
 */
export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PDF Tools ("the Service"), you agree to be bound by these Terms of Service 
                ("Terms"). If you disagree with any part of these terms, you do not have permission to access the 
                Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                PDF Tools provides online PDF conversion and manipulation tools, including but not limited to PDF to 
                image conversion, PDF to text extraction, and other PDF-related services. The Service is provided 
                free of charge and is available to users worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using our Service, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Not upload files containing malware, viruses, or malicious code</li>
                <li>Not upload files that infringe on intellectual property rights of others</li>
                <li>Not attempt to gain unauthorized access to any portion of the Service</li>
                <li>Not use the Service to transmit any unlawful, threatening, or offensive material</li>
                <li>Not interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Ensure you have the right to upload and process any files you submit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive 
                property of PDF Tools and its licensors. The Service is protected by copyright, trademark, and other 
                laws. You retain all rights to files you upload to our Service. We do not claim ownership of your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. File Processing and Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Files uploaded to our Service are processed on our servers and are automatically deleted immediately 
                after processing is complete. We do not store, share, or use your files for any purpose other than 
                providing the requested conversion or processing service. However, we cannot guarantee the security 
                of data transmitted over the internet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide continuous, uninterrupted access to our Service. However, we do not guarantee 
                that the Service will be available at all times or that it will be error-free. We reserve the right 
                to modify, suspend, or discontinue the Service (or any part thereof) at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law, PDF Tools shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, 
                either express or implied, including but not limited to warranties of merchantability, fitness for a 
                particular purpose, non-infringement, or course of performance. We do not warrant that the Service 
                will function uninterrupted, secure, or available at any particular time or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless PDF Tools and its licensors, employees, contractors, 
                agents, officers, and directors from and against any and all claims, damages, obligations, losses, 
                liabilities, costs, or debt, and expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, 
                without regard to its conflict of law provisions. Our failure to enforce any right or provision of 
                these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">11. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision 
                is material, we will provide at least 30 days' notice prior to any new terms taking effect. What 
                constitutes a material change will be determined at our sole discretion. By continuing to access or 
                use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">12. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:{" "}
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

