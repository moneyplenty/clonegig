import { Html, Head, Body, Container, Text, Heading, Section, Hr, Link, Img } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface EmailTemplateProps {
  type: "event-confirmation" | "meet-greet-confirmation" | "order-confirmation" | "welcome"
  // Event Confirmation Props
  eventTitle?: string
  eventDate?: string
  eventLocation?: string
  quantity?: number
  // Meet & Greet Confirmation Props
  sessionTitle?: string
  sessionDate?: string
  sessionLink?: string
  // Order Confirmation Props
  orderId?: string
  orderDate?: string
  totalAmount?: number
  orderItems?: { name: string; quantity: number; price: number }[]
  // Welcome Email Props
  userName?: string
}

export function EmailTemplate(props: EmailTemplateProps) {
  const { type } = props

  const renderContent = () => {
    switch (type) {
      case "event-confirmation":
        return (
          <>
            <Heading className="text-2xl font-bold text-center my-6">Event Confirmation</Heading>
            <Text className="text-base leading-6">Thank you for booking your tickets for:</Text>
            <Section className="my-4 p-4 bg-gray-100 rounded-md">
              <Text className="text-lg font-semibold mb-2">{props.eventTitle}</Text>
              <Text className="text-sm">
                <strong>Date:</strong> {props.eventDate}
              </Text>
              <Text className="text-sm">
                <strong>Location:</strong> {props.eventLocation}
              </Text>
              <Text className="text-sm">
                <strong>Tickets:</strong> {props.quantity}
              </Text>
            </Section>
            <Text className="text-base leading-6">We look forward to seeing you there!</Text>
          </>
        )
      case "meet-greet-confirmation":
        return (
          <>
            <Heading className="text-2xl font-bold text-center my-6">Meet & Greet Confirmation</Heading>
            <Text className="text-base leading-6">
              Your Meet & Greet session with Kelvin Creekman has been confirmed!
            </Text>
            <Section className="my-4 p-4 bg-gray-100 rounded-md">
              <Text className="text-lg font-semibold mb-2">{props.sessionTitle}</Text>
              <Text className="text-sm">
                <strong>Date:</strong> {props.sessionDate}
              </Text>
              <Text className="text-sm">
                <strong>Join Link:</strong>{" "}
                <Link href={props.sessionLink!} className="text-blue-600 underline">
                  Click here to join
                </Link>
              </Text>
            </Section>
            <Text className="text-base leading-6">Please join a few minutes before the scheduled time.</Text>
          </>
        )
      case "order-confirmation":
        return (
          <>
            <Heading className="text-2xl font-bold text-center my-6">Order Confirmation</Heading>
            <Text className="text-base leading-6">
              Thank you for your purchase! Your order #{props.orderId} has been confirmed.
            </Text>
            <Section className="my-4 p-4 bg-gray-100 rounded-md">
              <Text className="text-lg font-semibold mb-2">Order Details:</Text>
              <Text className="text-sm">
                <strong>Order ID:</strong> {props.orderId}
              </Text>
              <Text className="text-sm">
                <strong>Order Date:</strong> {props.orderDate}
              </Text>
              <Text className="text-sm">
                <strong>Total Amount:</strong> ${props.totalAmount?.toFixed(2)}
              </Text>
              <Text className="text-sm mt-2 font-semibold">Items:</Text>
              {props.orderItems?.map((item, index) => (
                <Text key={index} className="text-sm ml-4">
                  - {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
                </Text>
              ))}
            </Section>
            <Text className="text-base leading-6">
              Your items will be shipped soon. You will receive another email with tracking information.
            </Text>
          </>
        )
      case "welcome":
        return (
          <>
            <Heading className="text-2xl font-bold text-center my-6">Welcome to the Fan Club!</Heading>
            <Text className="text-base leading-6">Hi {props.userName || "there"},</Text>
            <Text className="text-base leading-6">
              Welcome to the official Kelvin Creekman Fan Club! We're thrilled to have you join our community.
            </Text>
            <Text className="text-base leading-6">
              Explore exclusive content, connect with other fans, and stay updated on all things Kelvin Creekman.
            </Text>
            <Section className="text-center my-6">
              <Link
                href="https://yourfanclubwebsite.com/dashboard"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold no-underline"
              >
                Go to Your Dashboard
              </Link>
            </Section>
            <Text className="text-base leading-6">
              If you have any questions, feel free to reach out to our support team.
            </Text>
          </>
        )
      default:
        return <Text>No content available.</Text>
    }
  }

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
            <Section className="text-center mb-6">
              <Img
                src="https://v0.dev/kelvin-logo.png" // Replace with your actual logo URL
                width="100"
                height="100"
                alt="Kelvin Creekman Logo"
                className="mx-auto"
              />
              <Text className="text-3xl font-extrabold text-gray-900 mt-4">Kelvin Creekman Fan Club</Text>
            </Section>
            <Hr className="my-6 border-gray-200" />
            {renderContent()}
            <Hr className="my-6 border-gray-200" />
            <Text className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Kelvin Creekman Fan Club. All rights reserved.
            </Text>
            <Text className="text-center text-sm text-gray-500">
              <Link href="https://yourfanclubwebsite.com/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="https://yourfanclubwebsite.com/terms" className="text-blue-600 underline">
                Terms of Service
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
