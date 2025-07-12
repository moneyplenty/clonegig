import { Html, Head, Body, Container, Text, Link, Img, Section, Hr, Tailwind } from "@react-email/components"

interface EmailTemplateProps {
  firstName: string
  message: string
}

export const EmailTemplate = ({ firstName, message }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="mx-auto p-8 bg-white shadow-lg rounded-lg">
          <Section className="text-center mb-6">
            <Img
              src="https://v0.dev/kelvin-logo.png" // Replace with your actual logo URL
              width="100"
              height="100"
              alt="Kelvin Creekman Fan Club Logo"
              className="mx-auto"
            />
            <Text className="text-2xl font-bold text-gray-800 mt-4">Kelvin Creekman Fan Club</Text>
          </Section>
          <Hr className="border-t border-gray-200 my-6" />
          <Section>
            <Text className="text-lg text-gray-700 leading-relaxed">Hello {firstName},</Text>
            <Text className="text-base text-gray-700 leading-relaxed">{message}</Text>
            <Text className="text-base text-gray-700 leading-relaxed mt-4">
              Thank you for being a part of the Kelvin Creekman community!
            </Text>
          </Section>
          <Section className="text-center mt-8">
            <Link
              href="https://yourfanclubwebsite.com" // Replace with your actual website URL
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md text-base font-semibold no-underline"
            >
              Visit Our Website
            </Link>
          </Section>
          <Hr className="border-t border-gray-200 my-6" />
          <Section className="text-center text-gray-500 text-sm">
            <Text>&copy; {new Date().getFullYear()} Kelvin Creekman Fan Club. All rights reserved.</Text>
            <Text>This email was sent to you because you are a member of the Kelvin Creekman Fan Club.</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)
